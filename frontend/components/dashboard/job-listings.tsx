/**
 * Job listings component for displaying job information.
 */
'use client';

import React, { useState, useCallback } from 'react';
import { uploadJobDescriptions, getJob } from '@/lib/api/resume';
import { useResumePreviewer } from '../common/resume_previewer_context';

interface JobListingsProps {
  className?: string;
}

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
}

export function JobListings({ className }: JobListingsProps) {
  const [jobDescriptions, setJobDescriptions] = useState<string>('');
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { resumeId, setJobId } = useResumePreviewer();

  const handleJobUpload = useCallback(async () => {
    if (!jobDescriptions.trim() || !resumeId) return;

    setIsUploading(true);
    try {
      // TODO: (frontend) Parse job descriptions from textarea
      const descriptions = jobDescriptions.split('\n').filter(desc => desc.trim());
      
      const response = await uploadJobDescriptions(descriptions, resumeId);
      
      // Fetch job details for each uploaded job
      const jobPromises = response.job_id.map(async (jobId) => {
        const jobData = await getJob(jobId);
        return {
          id: jobId,
          title: jobData.title,
          company: jobData.company,
          location: jobData.location,
        };
      });
      
      const jobList = await Promise.all(jobPromises);
      setJobs(jobList);
      
      // Set the first job ID in context
      if (response.job_id.length > 0) {
        setJobId(response.job_id[0]);
      }
    } catch (error) {
      console.error('Job upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  }, [jobDescriptions, resumeId, setJobId]);

  return (
    <div className={className}>
      <div className="space-y-4">
        <div>
          <label htmlFor="job-descriptions" className="block text-sm font-medium text-gray-700 mb-2">
            Job Descriptions
          </label>
          <textarea
            id="job-descriptions"
            value={jobDescriptions}
            onChange={(e) => setJobDescriptions(e.target.value)}
            placeholder="Paste job descriptions here (one per line)..."
            className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none"
            disabled={isUploading}
          />
        </div>
        
        <button
          onClick={handleJobUpload}
          disabled={isUploading || !jobDescriptions.trim() || !resumeId}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? 'Uploading...' : 'Upload Job Descriptions'}
        </button>
        
        {jobs.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Analyzed Jobs</h3>
            {jobs.map((job) => (
              <div key={job.id} className="p-4 border border-gray-200 rounded-md">
                <div className="font-semibold">{job.title}</div>
                <div className="text-gray-600">{job.company}</div>
                <div className="text-gray-500">{job.location}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
