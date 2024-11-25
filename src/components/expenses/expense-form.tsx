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
import { DynamicField, Expense, ExpenseCategory } from "@/types/expense"
import { expenseFormSchema } from "@/types/expense"
import { CategorySelect } from "@/components/expenses/category-select"
import { DatePicker } from "@/components/expenses/date-picker"
import { AmountInput } from "@/components/expenses/amount-input"
import { useState } from "react"
import { DynamicField as DynamicFieldComponent } from "@/components/expenses/dynamic-field"
import { mockCategories } from "@/lib/mock-data"
import { FileUpload } from "@/components/expenses/file-upload"

interface ExpenseFormProps {
  onSubmit: (values: z.infer<typeof expenseFormSchema>) => void
  initialData?: Partial<Expense>
}

export function ExpenseForm({ onSubmit, initialData }: ExpenseFormProps) {
  const [dynamicFields, setDynamicFields] = useState<DynamicField[]>([]);
  
  const form = useForm<z.infer<typeof expenseFormSchema>>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      description: initialData?.description || "",
      amount: initialData?.amount?.toString() || "",
      date: initialData?.date?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
      categoryPath: initialData?.categoryPath || [],
      status: initialData?.status || 'pending',
      dynamicFields: [],
      metadata: initialData?.metadata || {
        lastModified: new Date()
      }
    },
  });

  const handleCategoryChange = (path: string[]) => {
    form.setValue('categoryPath', path);
    
    // Find the selected category and its dynamic fields
    let currentCategory: ExpenseCategory | undefined = mockCategories.find(
      c => c.name === path[0]
    );
    
    for (let i = 1; i < path.length && currentCategory; i++) {
      currentCategory = currentCategory.subcategories?.find(
        c => c.name === path[i]
      );
    }

    // Update dynamic fields
    const newDynamicFields = currentCategory?.dynamicFields || [];
    setDynamicFields(newDynamicFields);
    form.setValue('dynamicFields', newDynamicFields);
  };

  const handleSubmit = (data: z.infer<typeof expenseFormSchema>) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                  onChange={handleCategoryChange}
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

        <FormField
          control={form.control}
          name="metadata.attachments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attachments</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onChange={(files) => {
                    form.setValue('metadata.attachments', files);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {dynamicFields.map((field) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`dynamicFields`}
            render={() => (
              <DynamicFieldComponent
                {...field}
                onChange={(value) => {
                  const updatedFields = dynamicFields.map(f =>
                    f.id === field.id ? { ...f, value } : f
                  );
                  setDynamicFields(updatedFields);
                  form.setValue('dynamicFields', updatedFields);
                }}
              />
            )}
          />
        ))}

        <Button type="submit" className="w-full">
          {initialData ? 'Update Expense' : 'Create Expense'}
        </Button>
      </form>
    </Form>
  )
}