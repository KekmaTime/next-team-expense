import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StatusActionsProps {
  expenseId: Id<"expenses">;
  currentStatus: 'pending' | 'approved' | 'rejected';
}

export function StatusActions({ expenseId, currentStatus }: StatusActionsProps) {
  const updateStatus = useMutation(api.expenses.updateStatus);

  const handleStatusUpdate = async (newStatus: 'approved' | 'rejected') => {
    try {
      await updateStatus({
        id: expenseId,
        status: newStatus,
        metadata: {
          approver: "current-user", // Replace with actual user ID from auth
          lastModified: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (currentStatus !== 'pending') {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleStatusUpdate('approved')}
            className="h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:bg-green-50"
          >
            <Check className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Approve (Alt+A)</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleStatusUpdate('rejected')}
            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Reject (Alt+R)</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}