"use client";

import {  ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {ClerkProvider, SignIn, useAuth} from "@clerk/clerk-react"
import Spinner from "./spinner";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return ( 
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
         <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
          <Authenticated>
          {children}
          </Authenticated>
          <Unauthenticated>
            <div className="flex flex-col items-center justify-center h-screen">
              <SignIn routing="hash" />
            </div>
          </Unauthenticated>
          <AuthLoading>
            <Spinner />
          </AuthLoading>
          </ConvexProviderWithClerk>
      </ClerkProvider>    
  )
}