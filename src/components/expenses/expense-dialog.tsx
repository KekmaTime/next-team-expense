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

type FormData = ExpenseFormData

interface ExpenseDialogProps {
  trigger: React.ReactNode
  expense?: Expense
}

export function ExpenseDialog({ trigger, expense }: ExpenseDialogProps) {
  const handleSubmit = async (data: FormData) => {
    // Not Implemented
    console.log(data)
  }

  return (
    <Dialog>
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