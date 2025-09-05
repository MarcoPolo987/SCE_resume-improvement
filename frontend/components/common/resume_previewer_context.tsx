/**
 * Context for managing resume previewer state.
 */
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ResumePreviewerContextType {
  resumeId: string | null;
  jobId: string | null;
  setResumeId: (id: string | null) => void;
  setJobId: (id: string | null) => void;
}

const ResumePreviewerContext = createContext<ResumePreviewerContextType | undefined>(undefined);

interface ResumePreviewerProviderProps {
  children: ReactNode;
}

export function ResumePreviewerProvider({ children }: ResumePreviewerProviderProps) {
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  return (
    <ResumePreviewerContext.Provider
      value={{
        resumeId,
        jobId,
        setResumeId,
        setJobId,
      }}
    >
      {children}
    </ResumePreviewerContext.Provider>
  );
}

export function useResumePreviewer() {
  const context = useContext(ResumePreviewerContext);
  if (context === undefined) {
    throw new Error('useResumePreviewer must be used within a ResumePreviewerProvider');
  }
  return context;
}
