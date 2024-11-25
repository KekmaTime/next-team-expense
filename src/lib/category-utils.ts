import { ExpenseCategory } from "@/types/expense";
import { mockCategories } from "./mock-data";

export function getCategoryRules(categoryPath: string[]) {
  let currentCategory: ExpenseCategory | undefined = mockCategories.find(
    c => c.name === categoryPath[0]
  );
  
  for (let i = 1; i < categoryPath.length && currentCategory; i++) {
    currentCategory = currentCategory.subcategories?.find(
      c => c.name === categoryPath[i]
    );
  }

  return currentCategory?.rules;
}