import {v} from "convex/values"
import {mutation, query} from "./_generated/server"
import {Doc, Id} from "./_generated/dataModel"

export const create = mutation({
    args: {
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if(!identity){
            throw new Error("Not Authenicated")
        }
        const userId = identity.subject;
        const document = await ctx.db.insert('documents', {
            title: args.title,
            userId,
            isArchived: false,
            isPublished: false
        })
        return document
    }
})

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }
    const userId = identity.subject; // Get the user's unique ID
    console.log("Fetching documents for userId:", userId);

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId)) // Filter by userId
      .filter((q) => q.eq(q.field("isArchived"), false)) // Exclude archived documents
      .collect();

    console.log("Fetched documents:", documents);

    return documents;
  },
});


//SEARCH FUNCTIONALITY

export const getSearch = query({
  handler: async (ctx)=> {
    const identity = await ctx.auth.getUserIdentity()
    if(!identity){
        throw new Error("Not Authenicated")
    }
    const userId = identity.subject;
    const documents = await ctx.db
    .query('documents')
    .withIndex('by_user', (q) =>  q.eq('userId', userId))
    .filter((q) =>
    q.eq(q.field('isArchived'), false),)
    .order('desc')
    .collect()

    return documents
  }
  
})




// Toggle Archive Status
export const toggleArchive = mutation({
  args: {
    id: v.id("documents"), // Document ID
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const userId = identity.subject;
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Document Not Found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Not Authorized to modify this document");
    }

    // Toggle isArchived field
    const updatedDocument = await ctx.db.patch(args.id, {
      isArchived: !existingDocument.isArchived, // Toggle archive status
    });

    return { success: true, message: "Archive status updated", updatedDocument };
  },
});




// GET ARCHIVED DOCUMENTS
export const getArchive = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const userId = identity.subject;

    // Fetch archived documents belonging to the authenticated user
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return documents;
  },
});

// RESTORE DOCUMENT FROM ARCHIVE
export const restoreDocument = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const userId = identity.subject;

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error("Document not found");
    }

    if (document.userId !== userId) {
      throw new Error("Not Authorized to restore this document");
    }

    // Restore the document by setting isArchived to false
    await ctx.db.patch(args.id, {
      isArchived: false,
    });

    return "Document restored successfully";
  },
});


//UPDATE DOCUMENT TITLE

// Get document by ID with authorization

export const getDocumentById = query({
  args: { id: v.optional(v.id("documents")) },
  handler: async (ctx, args) => {
    if (!args.id) {
      throw new Error("Document ID is required");
    }

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new Error("Document not found");
    }

    if (document.userId !== identity.subject) {
      throw new Error("Unauthorized access");
    }

    return document;
  },
});


// Update document title with authorization
export const updateTitle = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new Error("Document not found");
    }

    if (document.userId !== identity.subject) {
      throw new Error("Unauthorized access");
    }

    await ctx.db.patch(args.id, { title: args.title });

    return { success: true, message: "Title updated successfully" };
  },
});


//UPDATE ICON

export const updateIcon = mutation({
  args: { id: v.id('documents'), icon: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not Authenticated');
    }

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new Error('Document not found');
    }

    if (document.userId !== identity.subject) {
      throw new Error('Unauthorized access');
    }

    await ctx.db.patch(args.id, { icon: args.icon });

    return { success: true, message: 'Icon updated successfully' };
  },
});


//UPDATE COVER IMAGE
export const updateCoverImage = mutation({
  args: { id: v.id("documents"), coverImage: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new Error("Document not found");
    }

    if (document.userId !== identity.subject) {
      throw new Error("Unauthorized access");
    }

    await ctx.db.patch(args.id, { coverImage: args.coverImage || '' });

    return { success: true, message: "Cover image updated successfully" };
  },
});


//UPDATE CONTENT


// Mutation to update document content
export const updateContent = mutation({
  args: {
    id: v.id("documents"),
    content: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new Error("Document not found");
    }

    if (document.userId !== identity.subject) {
      throw new Error("Unauthorized access");
    }

    await ctx.db.patch(args.id, { content: args.content });

    return { success: true, message: "Content updated successfully" };
  },
});
