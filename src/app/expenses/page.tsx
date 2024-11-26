"use client";

import { DataTable } from "@/components/expenses/data-table";
import { columns } from "@/components/expenses/columns";
import { ExpenseDialog } from "@/components/expenses/expense-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { TableFilters } from "@/components/expenses/table-filters";
import { useState, useEffect } from "react";
import { mapConvexToExpense } from "@/lib/helpers";

interface ExpenseFilters {
  dateRange?: {
    from: Date | undefined;
    to: Date | undefined;
  };
  status?: 'all' | 'pending' | 'approved' | 'rejected';
}

export default function ExpensesPage() {
  const expenseDocs = useQuery(api.expenses.list) || [];
  const expenses = expenseDocs.map(mapConvexToExpense);
  const updateStatus = useMutation(api.expenses.updateStatus);
  const [filters, setFilters] = useState<ExpenseFilters>({
    status: 'all'
  });

  const getFilteredExpenses = () => {
    let filtered = expenses;

    if (filters.dateRange?.from || filters.dateRange?.to) {
      filtered = filtered.filter(exp => {
        return (
          (!filters.dateRange?.from || exp.date >= filters.dateRange.from) &&
          (!filters.dateRange?.to || exp.date <= filters.dateRange.to)
        );
      });
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(exp => exp.status === filters.status);
    }

    return filtered;
  };

  const handleFilterChange = (newFilters: ExpenseFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (!e.altKey) return;
      
      const selectedExpense = expenses.find(exp => exp.status === 'pending');
      if (!selectedExpense) return;

      if (e.key === 'a') {
        e.preventDefault();
        await updateStatus({
          id: selectedExpense.id,
          status: 'approved',
          metadata: { 
            approver: 'current-user',
            lastModified: new Date().toISOString()
          }
        });
      } else if (e.key === 'r') {
        e.preventDefault();
        await updateStatus({
          id: selectedExpense.id,
          status: 'rejected',
          metadata: { 
            approver: 'current-user',
            lastModified: new Date().toISOString()
          }
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expenses, updateStatus]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Team Expenses</h1>
        <div className="flex gap-4">
          <TableFilters onFilterChange={handleFilterChange} />
          <ExpenseDialog 
            trigger={
              <Button>
                <Plus className="w-4 h-4" />
                Add Expense
              </Button>
            } 
          />
        </div>
      </div>
      <DataTable 
        columns={columns} 
        data={getFilteredExpenses()} 
      />
    </div>
  );
}