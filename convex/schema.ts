import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  expenses: defineTable({
    description: v.string(),
    amount: v.number(),
    categoryPath: v.array(v.string()),
    date: v.string(),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    metadata: v.object({
      lastModified: v.string(),
      approver: v.optional(v.string()),
      rejectionReason: v.optional(v.string()),
      attachments: v.optional(v.array(v.object({
        id: v.string(),
        name: v.string(),
        size: v.number()
      })))
    })
  })
});