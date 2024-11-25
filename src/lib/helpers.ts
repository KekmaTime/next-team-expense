import { Id } from "../../convex/_generated/dataModel";
import { Expense } from "@/types/expense";

type ConvexExpense = {
  _id: Id<"expenses">;
  _creationTime: number;
  description: string;
  amount: number;
  categoryPath: string[];
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  metadata: {
    lastModified: string;
    approver?: string;
    rejectionReason?: string;
    attachments?: {
      id: string;
      name: string;
      size: number;
    }[];
  };
};

export function mapConvexToExpense(doc: ConvexExpense): Expense {
  return {
    id: doc._id.toString(),
    description: doc.description,
    amount: doc.amount,
    categoryPath: doc.categoryPath,
    date: new Date(doc.date),
    status: doc.status,
    metadata: {
      lastModified: new Date(doc.metadata.lastModified),
      approver: doc.metadata.approver,
      rejectionReason: doc.metadata.rejectionReason,
      attachments: doc.metadata.attachments?.map(attachment => ({
        id: attachment.id as Id<"_storage">,
        name: attachment.name,
        size: attachment.size
      }))
    }
  };
}