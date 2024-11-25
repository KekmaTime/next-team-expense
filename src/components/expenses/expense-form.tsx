"use client";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Expense } from "@/types/expense"
import { expenseFormSchema } from "@/types/expense"
import { CategorySelect } from "@/components/expenses/category-select"
import { DatePicker } from "@/components/expenses/date-picker"
import { AmountInput } from "@/components/expenses/amount-input"

interface ExpenseFormProps {
  onSubmit: (values: z.infer<typeof expenseFormSchema>) => void
  initialData?: Partial<Expense>
}

export function ExpenseForm({ onSubmit, initialData }: ExpenseFormProps) {
  const form = useForm<z.infer<typeof expenseFormSchema>>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      description: initialData?.description || "",
      amount: initialData?.amount?.toString() || "",
      date: initialData?.date?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
      categoryPath: initialData?.categoryPath || [],
      status: initialData?.status || 'pending',
      metadata: initialData?.metadata || {
        lastModified: new Date()
      }
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Team lunch, office supplies, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <AmountInput 
                  value={field.value}
                  onChange={field.onChange}
                  onStatusChange={(status) => {
                    form.setValue('status', status);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryPath"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <CategorySelect 
                  value={field.value} 
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker 
                  date={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => field.onChange(date?.toISOString().split('T')[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {initialData ? 'Update Expense' : 'Create Expense'}
        </Button>
      </form>
    </Form>
  )
}