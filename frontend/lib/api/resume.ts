/**
 * API client for resume-related operations.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const JSON_HEADERS = { 'Content-Type': 'application/json' };

export type UploadResumeResponse = {
  message: string;
  resume_id: string;
  request?: { request_id: string };
};

export type UploadJobsResponse = {
  message: string;
  job_id: string[];
  request?: { request_id: string };
};

export type JobData = {
  title: string;
  company: string;
  location: string;
};

export type ImprovementData = {
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
};

export async function uploadResume(content: string, contentType: 'text/markdown' | 'text/plain'): Promise<UploadResumeResponse> {
  const res = await fetch(`${API_URL}/resumes/upload-text`, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify({ content, content_type: contentType }),
  });
  if (!res.ok) throw new Error(`uploadResume failed: ${res.status}`);
  return res.json();
}

export async function uploadResumeFile(file: File): Promise<UploadResumeResponse> {
  const form = new FormData();
  form.append('file', file, file.name);
  const res = await fetch(`${API_URL}/resumes/upload`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) throw new Error(`uploadResumeFile failed: ${res.status}`);
  return res.json();
}

export async function uploadJobDescriptions(jobDescriptions: string[], resumeId: string): Promise<UploadJobsResponse> {
  const res = await fetch(`${API_URL}/jobs/upload`, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify({ job_descriptions: jobDescriptions, resume_id: resumeId }),
  });
  if (!res.ok) throw new Error(`uploadJobDescriptions failed: ${res.status}`);
  return res.json();
}

export async function getJob(jobId: string): Promise<JobData> {
  const res = await fetch(`${API_URL}/jobs/?job_id=${encodeURIComponent(jobId)}`);
  if (!res.ok) throw new Error(`getJob failed: ${res.status}`);
  const data = await res.json();
  return {
    title: data.title || '',
    company: data.company || '',
    location: data.location || '',
  };
}

export async function requestImprovement(resumeId: string, jobId: string): Promise<ImprovementData> {
  const res = await fetch(`${API_URL}/improve/improve`, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify({ resume_id: resumeId, job_id: jobId }),
  });
  if (!res.ok) throw new Error(`requestImprovement failed: ${res.status}`);
  return res.json();
}