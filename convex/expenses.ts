import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("expenses").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    description: v.string(),
    amount: v.number(),
    categoryPath: v.array(v.string()),
    date: v.string(),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    dynamicFields: v.array(v.object({
      id: v.string(),
      label: v.string(),
      type: v.union(
        v.literal("text"),
        v.literal("number"),
        v.literal("date"),
        v.literal("select")
      ),
      required: v.boolean(),
      options: v.optional(v.array(v.string())),
      value: v.string()
    })),
    metadata: v.object({
      lastModified: v.string(),
      approver: v.optional(v.string()),
      rejectionReason: v.optional(v.string()),
      attachments: v.optional(v.array(v.object({
        id: v.string(),
        name: v.string(),
        size: v.number()
      })))
    }),
    splits: v.optional(v.array(v.object({
      userId: v.string(),
      amount: v.number(),
      percentage: v.number()
    })))
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("expenses", args);
  },
});