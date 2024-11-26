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
        size: v.number(),
        url: v.string()
      })))
    }),
    splits: v.optional(v.array(v.object({
      userId: v.string(),
      amount: v.number(),
      percentage: v.number()
    })))
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("expenses", {
      ...args,
      metadata: {
        ...args.metadata,
        attachments: args.metadata.attachments?.map(attachment => ({
          ...attachment,
          url: `https://your-storage-url.com/${attachment.id}`
        }))
      }
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("expenses"),
    status: v.union(v.literal("approved"), v.literal("rejected")),
    metadata: v.object({
      approver: v.string(),
      rejectionReason: v.optional(v.string()),
      lastModified: v.string()
    })
  },
  handler: async (ctx, args) => {
    const { id, status, metadata } = args;
    
    const expense = await ctx.db.get(id);
    if (!expense) {
      throw new Error("Expense not found");
    }

    return await ctx.db.patch(id, {
      status,
      metadata: {
        ...expense.metadata,
        ...metadata,
        lastModified: new Date().toISOString()
      }
    });
  },
});