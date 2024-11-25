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