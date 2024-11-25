"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ExpenseForm } from "./expense-form"
import { Expense, ExpenseFormData } from "@/types/expense"
import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"

interface ExpenseDialogProps {
  trigger: React.ReactNode
  expense?: Expense
}

export function ExpenseDialog({ trigger, expense }: ExpenseDialogProps) {
  const [open, setOpen] = useState(false)
  const createExpense = useMutation(api.expenses.create)
  
  const handleSubmit = async (data: ExpenseFormData) => {
    try {
      await createExpense({
        description: data.description,
        amount: parseFloat(data.amount),
        categoryPath: data.categoryPath,
        date: new Date(data.date).toISOString(),
        status: data.status,
        dynamicFields: (data.dynamicFields || []).map(field => ({
          ...field,
          type: field.type as "text" | "number" | "date" | "select"
        })),
        metadata: {
          lastModified: new Date().toISOString(),
          approver: data.metadata.approver,
          rejectionReason: data.metadata.rejectionReason,
          attachments: data.metadata.attachments
        }
      })
      setOpen(false)
    } catch (error) {
      console.error("Failed to submit expense:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{expense ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
          <DialogDescription>
            {expense ? 'Make changes to the expense here.' : 'Add a new expense here.'}
          </DialogDescription>
        </DialogHeader>
        <ExpenseForm onSubmit={handleSubmit} initialData={expense} />
      </DialogContent>
    </Dialog>
  )
}