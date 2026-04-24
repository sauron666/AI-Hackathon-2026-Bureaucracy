"use client"

import type { ReactNode } from "react"
import { AuthProvider } from "@/lib/auth/context"
import { TrialProvider } from "@/lib/trial/context"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <TrialProvider>
        {children}
      </TrialProvider>
    </AuthProvider>
  )
}
