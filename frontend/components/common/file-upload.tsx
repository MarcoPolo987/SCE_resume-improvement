'use client';

import React, { useState, useCallback } from 'react';
import { uploadResume, uploadResumeFile } from '@/lib/api/resume';
import { useResumePreviewer } from './resume_previewer_context';

interface FileUploadProps {
  className?: string;
}

export function FileUpload({ className }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'parsing' | 'success' | 'error'>('idle');
  const { setResumeId } = useResumePreviewer();

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('uploading');

    try {
      let response;
      if (file.type === 'application/pdf') {
        setUploadStatus('parsing');
        response = await uploadResumeFile(file);
      } else {
        setUploadStatus('parsing');
        const content = await file.text();
        const contentType = file.type === 'text/markdown' ? 'text/markdown' : 'text/plain';
        response = await uploadResume(content, contentType);
      }
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
        <label htmlFor="resume-upload" className="cursor-pointer block">
          <div className="text-gray-600 mb-2">
            {uploadStatus === 'uploading' ? 'Uploading file...' : 
             uploadStatus === 'parsing' ? 'Parsing resume...' :
             uploadStatus === 'success' ? 'Resume parsed successfully!' :
             uploadStatus === 'error' ? 'Upload failed' :
             'Click to upload resume'}
          </div>
          <div className="text-sm text-gray-500">Supports .txt, .md, .pdf files</div>
        </label>

        {uploadStatus === 'success' && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="text-green-800 font-medium">✓ Resume has been parsed!</div>
            <div className="text-green-700 text-sm mt-1">Now upload job descriptions to get personalized improvement suggestions.</div>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="text-red-600 text-sm">Upload failed. Please try again.</div>
          </div>
        )}
      </div>
    </div>
  );
}