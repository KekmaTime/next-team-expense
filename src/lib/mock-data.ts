export const mockCategories = [
  {
    id: "food",
    name: "Food & Dining",
    subcategories: [
      {
        id: "meals",
        name: "Meals",
        subcategories: [
          { id: "team-lunch", name: "Team Events" },
          { id: "client-dinner", name: "Client Meetings" }
        ]
      },
      {
        id: "snacks", 
        name: "Snacks & Beverages"
      }
    ]
  },
  {
    id: "office",
    name: "Office",
    subcategories: [
      { id: "supplies", name: "Supplies" },
      { id: "equipment", name: "Equipment" }
    ]
  }
];