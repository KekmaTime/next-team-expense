import { FileIcon, DownloadIcon, XIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { formatFileSize } from "@/lib/utils";
import { Id } from "../../../convex/_generated/dataModel";
import { useState } from "react";

interface FilePreviewProps {
  file: {
    id: Id<"_storage">;
    name: string;
    size: number;
  };
  onRemove?: () => void;
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  const generateDownloadUrl = useMutation(api.files.generateDownloadUrl);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const downloadUrl = await generateDownloadUrl({ storageId: file.id });
      
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
      <div className="flex items-center gap-2">
        <FileIcon className="h-4 w-4 text-gray-500" />
        <div className="flex flex-col">
          <span className="text-sm font-medium truncate">{file.name}</span>
          <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
        </div>
      </div>
      <div className="flex gap-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <DownloadIcon className="h-4 w-4" />
          )}
        </Button>
        {onRemove && (
          <Button variant="ghost" size="sm" onClick={onRemove}>
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}