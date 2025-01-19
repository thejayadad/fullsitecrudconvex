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
        .collect(); // Ensure results are collected as an array
        
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