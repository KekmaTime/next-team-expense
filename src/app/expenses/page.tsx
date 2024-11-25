import { DataTable } from "@/components/expenses/data-table";
import { columns } from "@/components/expenses/columns";
import { ExpenseDialog } from "@/components/expenses/expense-dialog";
import { Button } from "@/components/ui/button";
import { Expense } from "@/types/expense";
import { Plus } from "lucide-react";

const mockExpenses: Expense[] = [
  {
    id: "1",
    description: "Team lunch",
    amount: 125.50,
    categoryPath: ["Food & Dining", "Meals", "Team Events"],
    date: new Date("2024-03-15"),
    status: "approved",
    metadata: {
      lastModified: new Date(),
      approver: "John Doe",
    },
  },
  {
    id: "2",
    description: "Office supplies",
    amount: 45.99,
    categoryPath: ["Office", "Supplies"],
    date: new Date("2024-03-14"),
    status: "pending",
    metadata: {
      lastModified: new Date(),
    },
  },
];

export default function ExpensesPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Team Expenses</h1>
        <ExpenseDialog 
          trigger={
            <Button>
              <Plus className="w-4 h-4" />
              Add Expense
            </Button>
          } 
        />
      </div>
      <DataTable columns={columns} data={mockExpenses} />
    </div>
  );
}