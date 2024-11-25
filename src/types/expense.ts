import * as z from "zod"

type ExpenseCategory = {
    id: string;
    name: string;
    subcategories?: ExpenseCategory[];
    rules?: {
      maxAmount?: number;
      requiresApproval?: boolean;
      allowedUsers?: string[];
    };
  };
  
  type ExpenseSplit = {
    userId: string;
    amount: number;
    percentage: number;
    note?: string;
  };
  
  export const expenseFormSchema = z.object({
    description: z.string().min(2, {
      message: "Description must be at least 2 characters.",
    }),
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Please enter a valid amount greater than 0",
    }),
    date: z.string(),
    categoryPath: z.array(z.string()).default([]),
    status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
    metadata: z.object({
      lastModified: z.date(),
      approver: z.string().optional(),
      rejectionReason: z.string().optional(),
      attachments: z.array(z.object({
        id: z.string(),
        name: z.string(),
        size: z.number()
      })).optional()
    }).default({
      lastModified: new Date()
    })
  })
  
  export type ExpenseFormData = z.infer<typeof expenseFormSchema>
  
  interface Expense {
    id: string;
    description: string;
    amount: number;
    categoryPath: string[]; // Must store full path
    date: Date;
    status: 'pending' | 'approved' | 'rejected';
    splits?: ExpenseSplit[];
    metadata: {
      lastModified: Date;
      approver?: string;
      rejectionReason?: string;
      attachments?: {
        id: string;
        name: string;
        size: number;
      }[];
    };
  }
  
  export type { ExpenseCategory, ExpenseSplit, Expense };