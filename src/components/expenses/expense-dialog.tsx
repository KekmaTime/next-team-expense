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
import { Expense } from "@/types/expense"
import { ExpenseFormData } from "@/types/expense"
import { useState } from "react"
import { createExpense } from "@/app/actions"

type FormData = ExpenseFormData

interface ExpenseDialogProps {
  trigger: React.ReactNode
  expense?: Expense
}

export function ExpenseDialog({ trigger, expense }: ExpenseDialogProps) {
  const [open, setOpen] = useState(false)
  
  const handleSubmit = async (data: FormData) => {
    try {
      await createExpense(data)
      setOpen(false)
      // In a real app, we would update the table data here
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