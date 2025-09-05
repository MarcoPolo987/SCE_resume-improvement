/**
 * Resume analysis component for displaying scores and improvement suggestions.
 */
'use client';

import React, { useState, useCallback } from 'react';
import { requestImprovement } from '@/lib/api/resume';
import { useResumePreviewer } from '../common/resume_previewer_context';

interface ResumeAnalysisProps {
  className?: string;
}

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

export function ResumeAnalysis({ className }: ResumeAnalysisProps) {
  const [improvementData, setImprovementData] = useState<ImprovementData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { resumeId, jobId } = useResumePreviewer();

  const handleRequestImprovement = useCallback(async () => {
    if (!resumeId || !jobId) return;

    setIsLoading(true);
    try {
      const data = await requestImprovement(resumeId, jobId);
      setImprovementData(data);
      console.log('Improvement data:', data); // TODO: (frontend) Remove console.log when implementing real UI
    } catch (error) {
      console.error('Improvement request failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [resumeId, jobId]);

  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Resume Analysis</h3>
          <button
            onClick={handleRequestImprovement}
            disabled={isLoading || !resumeId || !jobId}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analyzing...' : 'Request Improvement (stub)'}
          </button>
        </div>
        
        {/* Score Display */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-md text-center">
            <div className="text-2xl font-bold text-gray-400">0</div>
            <div className="text-sm text-gray-600">Original Score</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-md text-center">
            <div className="text-2xl font-bold text-gray-400">0</div>
            <div className="text-sm text-gray-600">Improved Score</div>
          </div>
        </div>
        
        {/* Improvement Details */}
        {improvementData && (
          <div className="space-y-3">
            <div className="p-4 border border-gray-200 rounded-md">
              <h4 className="font-semibold mb-2">Analysis Details</h4>
              <p className="text-gray-600">{improvementData.data.details}</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <h4 className="font-semibold mb-2">Commentary</h4>
              <p className="text-gray-600">{improvementData.data.commentary}</p>
            </div>
            
            {improvementData.data.improvements.length > 0 && (
              <div className="p-4 border border-gray-200 rounded-md">
                <h4 className="font-semibold mb-2">Improvements</h4>
                <ul className="list-disc list-inside space-y-1">
                  {improvementData.data.improvements.map((improvement, index) => (
                    <li key={index} className="text-gray-600">{improvement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {!resumeId && (
          <div className="text-gray-500 text-center py-4">
            Upload a resume to begin analysis
          </div>
        )}
        
        {resumeId && !jobId && (
          <div className="text-gray-500 text-center py-4">
            Upload job descriptions to enable analysis
          </div>
        )}
      </div>
    </div>
  );
}
