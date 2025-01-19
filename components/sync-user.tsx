"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";

const SyncUserConvex = () => {
  const { user } = useUser(); // Get the user from Clerk
  const findOrCreateUser = useMutation(api.users.findOrCreateUser); // Mutation to sync user

  useEffect(() => {
    const syncUser = async () => {
      if (user) {
        try {
          // Construct the input payload
          const payload = {
            email: user.emailAddresses[0]?.emailAddress || "", // Fallback to empty string if no email
            name: user.firstName || "Anonymous", // Fallback for name
            avatar: user.imageUrl || "", // Fallback for avatar
          };

          // Ensure email is present
          if (!payload.email) {
            console.error("No email available for the user.");
            return;
          }

          // Call the mutation
          await findOrCreateUser();
          console.log("User synced successfully with Convex");
        } catch (error) {
          console.error("Error syncing user with Convex:", error);
        }
      }
    };

    syncUser();
  }, [user, findOrCreateUser]);

  return null; // No UI, only a helper
};

export default SyncUserConvex;