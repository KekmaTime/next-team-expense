import { ExpenseCategory } from "@/types/expense";

export const mockCategories: ExpenseCategory[] = [
  {
    name: "Travel",
    subcategories: [
      {
        name: "Airfare",
        dynamicFields: [
          {
            id: "flight-number",
            label: "Flight Number",
            type: "text",
            required: true,
            value: ""
          }
        ]
      },
      {
        name: "Hotel",
        dynamicFields: [
          {
            id: "check-in",
            label: "Check-in Date",
            type: "date",
            required: true,
            value: ""
          },
          {
            id: "check-out",
            label: "Check-out Date",
            type: "date",
            required: true,
            value: ""
          }
        ]
      }
    ]
  },
  {
    name: "Office Supplies",
    subcategories: [
      {
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