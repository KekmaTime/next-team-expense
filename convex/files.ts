import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const storeFileMetadata = mutation({
  args: {
    storageId: v.id("_storage"),
    name: v.string(),
    size: v.number(),
  },
  handler: async (ctx, args) => {
    const { storageId, name, size } = args;
    
    // Verify the file exists in storage
    const url = await ctx.storage.getUrl(storageId);
    if (!url) {
      throw new Error("File not found in storage");
    }

    return {
      id: storageId,
      name,
      size,
    };
  },
});

export const generateDownloadUrl = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    if (!url) {
      throw new Error("File not found");
    }
    return url;
  },
});