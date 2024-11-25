import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("categories").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    rules: v.optional(v.object({
      maxAmount: v.optional(v.number()),
      requiresApproval: v.optional(v.boolean()),
      allowedUsers: v.optional(v.array(v.string()))
    })),
    subcategories: v.optional(v.array(v.object({
      id: v.string(),
      name: v.string(),
      rules: v.optional(v.object({
        maxAmount: v.optional(v.number()),
        requiresApproval: v.optional(v.boolean())
      })),
      dynamicFields: v.optional(v.array(v.object({
        id: v.string(),
        label: v.string(),
        type: v.string(),
        required: v.boolean(),
        options: v.optional(v.array(v.string())),
        value: v.string()
      })))
    })))
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("categories", args);
  },
});

export const seed = mutation({
  handler: async (ctx) => {
    // Check if categories already exist
    const existing = await ctx.db.query("categories").collect();
    if (existing.length > 0) return;

    // Seed initial categories
    await ctx.db.insert("categories", {
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
    });

    await ctx.db.insert("categories", {
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
    });
  }
});