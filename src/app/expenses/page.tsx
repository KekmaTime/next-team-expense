"use client";

import { DataTable } from "@/components/expenses/data-table";
import { columns } from "@/components/expenses/columns";
import { ExpenseDialog } from "@/components/expenses/expense-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { mapConvexToExpense } from "@/lib/helpers";

export default function ExpensesPage() {
  const expenseDocs = useQuery(api.expenses.list) || [];
  const expenses = expenseDocs.map(mapConvexToExpense);

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
      <DataTable columns={columns} data={expenses} />
    </div>
  );
}