// frontend/components/common/file-upload.tsx
'use client';

import React, { useState, useCallback, useRef } from 'react';
import { uploadResume } from '@/lib/api/resume';
import { useResumePreviewer } from './resume_previewer_context';
import { cn } from '@/lib/utils';

interface FileUploadProps { className?: string; }

export function FileUpload({ className }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const { setResumeId } = useResumePreviewer();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setIsUploading(true);
    setStatus('idle');
    setFileName(file.name);
    try {
      const content = await file.text();
      const contentType = file.type === 'text/markdown' ? 'text/markdown' : 'text/plain';
      const response = await uploadResume(content, contentType);
      setResumeId(response.resume_id);
      setStatus('success');
    } catch (e) {
      console.error(e);
      setStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const onInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleFile(file);
  }, []);

  const onDrop = useCallback(async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) await handleFile(file);
  }, []);

  return (
    <div className={className}>
      <div
        className={cn(
          "rounded-xl border-2 border-dashed p-6 text-center transition",
          isUploading ? "opacity-70" : "hover:border-gray-400",
          status === 'success' ? "border-green-300 bg-green-50" : status === 'error' ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".txt,.md,.pdf"
          onChange={onInputChange}
          disabled={isUploading}
          className="hidden"
          id="resume-upload"
        />
        <label
          htmlFor="resume-upload"
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="cursor-pointer block"
        >
          <div className="font-medium mb-1">
            {isUploading ? 'Uploading…' : 'Click or drag a file here'}
          </div>
          <div className="text-sm text-gray-500">Supports .txt, .md, .pdf files</div>
          {fileName && (
            <div className="mt-3 text-xs text-gray-500">Selected: {fileName}</div>
          )}
        </label>

        {/* Tiny feedback */}
        {status === 'success' && (
          <div className="mt-3 inline-flex items-center text-sm text-green-700">
            <span className="mr-2 h-2 w-2 rounded-full bg-green-600" /> Uploaded!
          </div>
        )}
        {status === 'error' && (
          <div className="mt-3 inline-flex items-center text-sm text-red-700">
            <span className="mr-2 h-2 w-2 rounded-full bg-red-600" /> Upload failed. Try again.
          </div>
        )}
      </div>
    </div>
  );
}
export default FileUpload;