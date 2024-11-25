import { useDropzone } from 'react-dropzone';
import { UploadCloud, Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Progress } from "@/components/ui/progress";
import { FilePreview } from "./file-preview";
import { Id } from "../../../convex/_generated/dataModel";

interface FileUploadProps {
  value?: Array<{ id: Id<"_storage">; name: string; size: number }>;
  onChange: (files: Array<{ id: Id<"_storage">; name: string; size: number }>) => void;
}

export function FileUpload({ value = [], onChange }: FileUploadProps) {
  const [files, setFiles] = useState(value);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const storeFileMetadata = useMutation(api.files.storeFileMetadata);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setProgress(0);
    try {
      const uploadUrl = await generateUploadUrl();
      
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const { storageId } = await response.json();
      
      const fileMetadata = await storeFileMetadata({
        storageId,
        name: file.name,
        size: file.size,
      });

      const updatedFiles = [...files, fileMetadata];
      setFiles(updatedFiles);
      onChange(updatedFiles);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      for (const file of acceptedFiles) {
        await uploadFile(file);
      }
    },
    maxSize: 5 * 1024 * 1024,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    }
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}
          ${uploading ? 'pointer-events-none opacity-50' : ''}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="space-y-2">
            <Loader2 className="mx-auto h-12 w-12 text-gray-400 animate-spin" />
            <Progress value={progress} className="w-full" />
          </div>
        ) : (
          <>
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {isDragActive
                ? "Drop the files here..."
                : "Drag 'n' drop files here, or click to select files"}
            </p>
          </>
        )}
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file) => (
            <li key={file.id}>
              <FilePreview
                file={file}
                onRemove={() => {
                  const updatedFiles = files.filter(f => f.id !== file.id);
                  setFiles(updatedFiles);
                  onChange(updatedFiles);
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}