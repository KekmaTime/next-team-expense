import { z } from "zod";
import { Id } from "../../convex/_generated/dataModel";

export type ExpenseCategory = {
  id: string;
  name: string;
  subcategories?: ExpenseCategory[];
  rules?: {
    maxAmount?: number;
    requiresApproval?: boolean;
    allowedUsers?: string[];
  };
  dynamicFields?: DynamicField[];
};

export type ExpenseSplit = {
  userId: string;
  amount: number;
  percentage: number;
};

export type DynamicField = {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select';
  required: boolean;
  options?: string[];
  value: string;
};

export const expenseFormSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.string().min(1, "Amount is required"),
  date: z.string(),
  categoryPath: z.array(z.string()),
  status: z.enum(["pending", "approved", "rejected"]),
  dynamicFields: z.array(z.object({
    id: z.string(),
    label: z.string(),
    type: z.enum(["text", "number", "date", "select"]),
    required: z.boolean(),
    options: z.array(z.string()).optional(),
    value: z.string()
  })).default([]),
  metadata: z.object({
    lastModified: z.date(),
    approver: z.string().optional(),
    rejectionReason: z.string().optional(),
    attachments: z.array(z.object({
      id: z.custom<Id<"_storage">>(),
      name: z.string(),
      size: z.number()
    })).optional()
  }),
  splits: z.array(z.object({
    userId: z.string(),
    amount: z.number(),
    percentage: z.number()
  })).optional()
});

export type ExpenseFormData = z.infer<typeof expenseFormSchema>;

export interface Expense {
  id: Id<"expenses">;
  description: string;
  amount: number;
  categoryPath: string[];
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
  splits?: ExpenseSplit[];
  metadata: {
    lastModified: Date;
    approver?: string;
    rejectionReason?: string;
    attachments?: {
      id: Id<"_storage">;
      name: string;
      size: number;
    }[];
  };
}