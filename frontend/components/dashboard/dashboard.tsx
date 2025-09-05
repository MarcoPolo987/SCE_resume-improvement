// frontend/components/dashboard/dashboard.tsx
'use client';
import React from 'react';
import { FileUpload } from '../common/file-upload';
import { JobListings } from './job-listings';
import { ResumeAnalysis } from './resume-analysis';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

export function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Resume Matcher</h1>
        <p className="mt-2 text-gray-600">
          Upload your resume and paste job descriptions. We’ll analyze fit and surface improvements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardTitle>Upload Resume</CardTitle>
          <CardDescription className="mt-1">.txt / .md / .pdf supported</CardDescription>
          <div className="mt-4">
            <FileUpload />
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <CardTitle>Job Descriptions</CardTitle>
          <CardDescription className="mt-1">Paste one per line, then upload</CardDescription>
          <div className="mt-4">
            <JobListings />
          </div>
        </Card>
        <Card>
          <CardTitle>Resume Analysis</CardTitle>
          <CardDescription className="mt-1">Request a quick (stub) analysis</CardDescription>
          <div className="mt-4">
            <ResumeAnalysis />
          </div>
        </Card>

        
      </div>
    </div>
  );
}
