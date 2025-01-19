import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listUsers = query({
    handler: async (ctx) => {
      const users = await ctx.db.query("users").collect();
      return users; // Return all users
    },
  });


  export const findOrCreateUser = mutation({
    handler: async (ctx) => {
      const user = await ctx.auth.getUserIdentity();
  
      if (!user) {
        throw new Error("User not authenticated.");
      }
      console.log("User " + user.pictureUrl)
  
      const { email, name, pictureUrl } = user;
       // Ensure `email` exists
    if (!email) {
        throw new Error("User email is missing.");
      }
  
      // Ensure `picture` is a string or provide a fallback
      const avatar = typeof pictureUrl === "string" ? pictureUrl : "";
  
      const existingUser = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), email))
        .first();
  
      if (existingUser) {
        return existingUser; // Return existing user
      }
  
      const newUser = await ctx.db.insert("users", {
        email,
        name: name || "Anonymous",
        avatar, // Use the safe avatar string
        createdAt: new Date().toISOString(),
      });
  
      return newUser;
    },
  });
  