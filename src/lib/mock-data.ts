import { ExpenseCategory } from "@/types/expense";

export const mockCategories: ExpenseCategory[] = [
  {
    id: "travel",
    name: "Travel",
    rules: {
      maxAmount: 5000,
      requiresApproval: true,
      allowedUsers: ["admin", "manager"]
    },
    subcategories: [
      {
        id: "airfare",
        name: "Airfare",
        rules: {
          maxAmount: 2000,
          requiresApproval: true
        },
        dynamicFields: [
          {
            id: "flight-number",
            label: "Flight Number",
            type: "text",
            required: true,
            value: ""
          }
        ]
      }
    ]
  },
  {
    id: "office-supplies", 
    name: "Office Supplies",
    subcategories: [
      {
        id: "electronics",
        name: "Electronics",
        dynamicFields: [
          {
            id: "serial-number",
            label: "Serial Number", 
            type: "text",
            required: true,
            value: ""
          }
        ]
      }
    ]
  }
];