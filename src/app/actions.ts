"use server"

import { ExpenseFormData } from "@/types/expense"

export async function createExpense(data: ExpenseFormData) {
  try {
    // call to db
    console.log("Creating expense:", data)

    // test delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      id: Math.random().toString(36).slice(2),
      ...data,
      amount: parseFloat(data.amount),
      date: new Date(data.date),
      metadata: {
        ...data.metadata,
        lastModified: new Date()
      }
    }
  } catch (error) {
    console.error("Failed to create expense:", error)
    throw new Error("Failed to create expense")
  }
}