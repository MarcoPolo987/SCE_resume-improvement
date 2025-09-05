/**
 * File upload component for resume uploads.
 */
'use client';

import React, { useState, useCallback } from 'react';
import { uploadResume } from '@/lib/api/resume';
import { useResumePreviewer } from './resume_previewer_context';

interface FileUploadProps {
  className?: string;
}

export function FileUpload({ className }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { setResumeId } = useResumePreviewer();

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      // TODO: (frontend) read file & send to uploadResume
      // For now, convert file to text content
      const content = await file.text();
      const contentType = file.type === 'text/markdown' ? 'text/markdown' : 'text/plain';
      
      const response = await uploadResume(content, contentType);
      
      // Store resume ID in context
      setResumeId(response.resume_id);
      setUploadStatus('success');
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  }, [setResumeId]);

  return (
    <div className={className}>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          accept=".txt,.md,.pdf"
          onChange={handleFileUpload}
          disabled={isUploading}
          className="hidden"
          id="resume-upload"
        />
        <label
          htmlFor="resume-upload"
          className="cursor-pointer block"
        >
          <div className="text-gray-600 mb-2">
            {isUploading ? 'Uploading...' : 'Click to upload resume'}
          </div>
          <div className="text-sm text-gray-500">
            Supports .txt, .md, .pdf files
          </div>
        </label>
        
        {uploadStatus === 'success' && (
          <div className="mt-2 text-green-600 text-sm">
            Resume uploaded successfully!
          </div>
        )}
        
        {uploadStatus === 'error' && (
          <div className="mt-2 text-red-600 text-sm">
            Upload failed. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}
