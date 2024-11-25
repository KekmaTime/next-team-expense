import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  expenses: defineTable({
    description: v.string(),
    amount: v.number(),
    categoryPath: v.array(v.string()),
    date: v.string(),
    status: v.string(),
    dynamicFields: v.optional(v.array(v.object({
      id: v.string(),
      label: v.string(),
      type: v.string(),
      required: v.boolean(),
      options: v.optional(v.array(v.string())),
      value: v.string()
    }))),
    metadata: v.object({
      lastModified: v.string(),
      approver: v.optional(v.string()),
      rejectionReason: v.optional(v.string()),
      attachments: v.optional(v.array(v.object({
        id: v.string(),
        name: v.string(),
        size: v.number(),
        url: v.string()
      })))
    }),
    splits: v.optional(v.array(v.object({
      userId: v.string(),
      amount: v.number(),
      percentage: v.number()
    })))
  }),
  categories: defineTable({
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
  })
});