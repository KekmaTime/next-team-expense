import { ExpenseCategory } from "@/types/expense";

export const mockCategories: ExpenseCategory[] = [
  {
    id: "food",
    name: "Food & Dining",
    subcategories: [
      {
        id: "meals",
        name: "Meals",
        subcategories: [
          { 
            id: "team-lunch", 
            name: "Team Events",
            dynamicFields: [
              {
                id: "attendees",
                label: "Number of Attendees",
                type: "number",
                required: true,
                value: ""
              },
              {
                id: "event-type",
                label: "Event Type",
                type: "select",
                required: true,
                options: ["Team Lunch", "Team Dinner", "Celebration"],
                value: ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "office",
    name: "Office",
    subcategories: [
      { 
        id: "supplies", 
        name: "Supplies",
        dynamicFields: [
          {
            id: "department",
            label: "Department",
            type: "text",
            required: true,
            value: ""
          }
        ]
      }
    ]
  }
];