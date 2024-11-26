import { Id } from "../../convex/_generated/dataModel";
import { Expense } from "@/types/expense";

type ConvexExpense = {
  _id: Id<"expenses">;
  _creationTime: number;
  description: string;
  amount: number;
  categoryPath: string[];
  date: string;
  status: string;
  dynamicFields?: {
    id: string;
    label: string;
    type: string;
    required: boolean;
    options?: string[];
    value: string;
  }[];
  splits?: {
    userId: string;
    amount: number;
    percentage: number;
  }[];
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
    id: doc._id,
    description: doc.description,
    amount: doc.amount,
    categoryPath: doc.categoryPath,
    date: new Date(doc.date),
    status: doc.status as 'pending' | 'approved' | 'rejected',
    splits: doc.splits,
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