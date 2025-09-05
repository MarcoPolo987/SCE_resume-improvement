/**
 * Main dashboard component.
 */
'use client';

import React from 'react';
import { FileUpload } from '../common/file-upload';
import { JobListings } from './job-listings';
import { ResumeAnalysis } from './resume-analysis';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Resume Matcher</h1>
          <p className="mt-2 text-gray-600">
            Upload your resume and job descriptions to get personalized improvement suggestions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload and Job Listings */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>
              <FileUpload />
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Job Descriptions</h2>
              <JobListings />
            </div>
          </div>
          
          {/* Right Column - Resume Analysis */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Resume Analysis</h2>
              <ResumeAnalysis />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
