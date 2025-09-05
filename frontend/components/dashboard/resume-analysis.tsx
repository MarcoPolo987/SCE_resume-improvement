// frontend/components/dashboard/resume-analysis.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { requestImprovement } from '@/lib/api/resume';
import { useResumePreviewer } from '../common/resume_previewer_context';

interface ImprovementData {
  request_id: string;
  data: {
    resume_id: string;
    job_id: string;
    original_score: number;
    new_score: number;
    resume_preview: {
      personalInfo: { name: string; email: string; phone: string };
      summary: string | null;
      experience: any[];
      education: any[];
      skills: any[];
    };
    details: string;
    commentary: string;
    improvements: any[];
  };
}

export function ResumeAnalysis({ className }: { className?: string }) {
  const [data, setData] = useState<ImprovementData | null>(null);
  const [loading, setLoading] = useState(false);
  const { resumeId, jobId } = useResumePreviewer();

  const onAnalyze = useCallback(async () => {
    if (!resumeId || !jobId) return;
    setLoading(true);
    try {
      const result = await requestImprovement(resumeId, jobId);
      setData(result);
    } catch (e) {
      console.error('Improvement request failed:', e);
    } finally {
      setLoading(false);
    }
  }, [resumeId, jobId]);

  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Resume Analysis</h3>
          <button
            onClick={onAnalyze}
            disabled={loading || !resumeId || !jobId}
            className={`px-4 py-2 rounded-md text-white ${
              loading || !resumeId || !jobId
                ? 'bg-green-300 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? 'Analyzing…' : 'Run Analysis (stub)'}
          </button>
        </div>

        {/* Scores */}
        <div className="grid grid-cols-2 gap-3">
          <div className="border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">
              {data ? data.data.original_score : 0}
            </div>
            <div className="text-xs text-gray-500 mt-1">Original Score</div>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">
              {data ? data.data.new_score : 0}
            </div>
            <div className="text-xs text-gray-500 mt-1">Improved Score</div>
          </div>
        </div>

        {/* Guidance */}
        {!resumeId && (
          <div className="text-gray-500 text-center py-4">
            Upload a resume to begin analysis.
          </div>
        )}
        {resumeId && !jobId && (
          <div className="text-gray-500 text-center py-4">
            Upload job descriptions to enable analysis.
          </div>
        )}

        {/* Details */}
        {data && (
          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-1">Analysis Details</h4>
              <p className="text-gray-700 text-sm">{data.data.details}</p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-1">Commentary</h4>
              <p className="text-gray-700 text-sm">{data.data.commentary}</p>
            </div>
            {data.data.improvements.length > 0 && (
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Improvements</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {data.data.improvements.map((imp, i) => (
                    <li key={i}>{typeof imp === 'string' ? imp : JSON.stringify(imp)}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
