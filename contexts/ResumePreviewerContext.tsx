"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ResumePreviewerContextType {
  resumeId: string | null
  setResumeId: (id: string | null) => void
}

const ResumePreviewerContext = createContext<ResumePreviewerContextType | undefined>(undefined)

export function ResumePreviewerProvider({ children }: { children: ReactNode }) {
  const [resumeId, setResumeId] = useState<string | null>(null)

  return <ResumePreviewerContext.Provider value={{ resumeId, setResumeId }}>{children}</ResumePreviewerContext.Provider>
}

export function useResumePreviewer() {
  const context = useContext(ResumePreviewerContext)
  if (context === undefined) {
    throw new Error("useResumePreviewer must be used within a ResumePreviewerProvider")
  }
  return context
}
