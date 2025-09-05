'use client';

import React, { useState, useCallback, useRef } from 'react';
import { uploadResume, uploadResumeFile } from '@/lib/api/resume';
import { useResumePreviewer } from './resume_previewer_context';
import { cn } from '@/lib/utils';

interface FileUploadProps { className?: string; }

export function FileUpload({ className }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'parsing' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const { setResumeId } = useResumePreviewer();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setIsUploading(true);
    setUploadStatus('uploading');
    setFileName(file.name);

    try {
      let response;
      if (file.type === 'application/pdf') {
        setUploadStatus('parsing');
        response = await uploadResumeFile(file);
      } else {
        const content = await file.text();
        const contentType = file.type === 'text/markdown' ? 'text/markdown' : 'text/plain';
        response = await uploadResume(content, contentType);
      }
      
      setResumeId(response.resume_id);
      setUploadStatus('success');
    } catch (e) {
      console.error('Upload failed:', e);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const onInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const getStatusMessage = () => {
    switch (uploadStatus) {
      case 'uploading':
        return 'Uploading your resume...';
      case 'parsing':
        return 'Parsing PDF content...';
      case 'success':
        return `✅ ${fileName} uploaded successfully!`;
      case 'error':
        return '❌ Upload failed. Please try again.';
      default:
        return 'Click or drag a file here';
    }
  };

  const getStatusColor = () => {
    switch (uploadStatus) {
      case 'success':
        return 'border-green-300 bg-green-50 text-green-700';
      case 'error':
        return 'border-red-300 bg-red-50 text-red-700';
      case 'uploading':
      case 'parsing':
        return 'border-blue-300 bg-blue-50 text-blue-700';
      default:
        return 'border-gray-300 bg-white hover:border-gray-400';
    }
  };

  return (
    <div className={className}>
      <div
        className={cn(
          "rounded-xl border-2 border-dashed p-6 text-center transition cursor-pointer",
          getStatusColor()
        )}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.txt,.md"
          onChange={onInputChange}
          className="hidden"
        />
        
        <div className="space-y-2">
          <div className="text-4xl">
            {uploadStatus === 'success' ? '✅' : uploadStatus === 'error' ? '❌' : '📄'}
          </div>
          <div className="font-medium mb-1">
            {isUploading ? 'Uploading…' : getStatusMessage()}
          </div>
          <div className="text-sm text-gray-500">
            Supports PDF, TXT, and Markdown files
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;