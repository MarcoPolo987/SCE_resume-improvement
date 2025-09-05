/**
 * API client for resume-related operations.
 */

// DEV STUB - Set to true for local development without network calls
const USE_FIXTURES = true;

export type UploadResumeResponse = {
  message: string;
  resume_id: string;
  request?: { request_id: string };
};

export type UploadJobsResponse = {
  message: string;
  job_id: string[]; // from backend
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
  if (USE_FIXTURES) {
    // DEV STUB - Return fixture data for local development
    return {
      message: "Resume uploaded successfully (stub)",
      resume_id: "stub-resume-id",
      request: { request_id: "req-stub" }
    };
  }
  
  // TODO: (frontend) POST to /api/v1/resumes/upload
  // TODO: (frontend) Implement actual fetch logic
  throw new Error('Not implemented');
}

export async function uploadJobDescriptions(jobDescriptions: string[], resumeId: string): Promise<UploadJobsResponse> {
  if (USE_FIXTURES) {
    // DEV STUB - Return fixture data for local development
    return {
      message: "Job descriptions uploaded successfully (stub)",
      job_id: ["stub-job-id"],
      request: { request_id: "req-stub" }
    };
  }
  
  // TODO: (frontend) POST to /api/v1/jobs/upload
  // TODO: (frontend) Implement actual fetch logic
  throw new Error('Not implemented');
}

export async function getJob(jobId: string): Promise<JobData> {
  if (USE_FIXTURES) {
    // DEV STUB - Return fixture data for local development
    return {
      title: "Software Engineer",
      company: "Acme Corp",
      location: "Remote"
    };
  }
  
  // TODO: (frontend) GET /api/v1/jobs?job_id={jobId}
  // TODO: (frontend) Return { title, company, location } subset for now
  throw new Error('Not implemented');
}

export async function requestImprovement(resumeId: string, jobId: string): Promise<ImprovementData> {
  if (USE_FIXTURES) {
    // DEV STUB - Return fixture data for local development
    return {
      request_id: 'req-stub',
      data: {
        resume_id: resumeId,
        job_id: jobId,
        original_score: 0,
        new_score: 0,
        resume_preview: {
          personalInfo: { name: '', email: '', phone: '' },
          summary: null,
          experience: [],
          education: [],
          skills: []
        },
        details: 'TODO: analysis details',
        commentary: 'TODO: commentary',
        improvements: []
      }
    };
  }
  
  // TODO: (frontend) POST /api/v1/improve/improve
  // TODO: (frontend) Return placeholder improvement payload
  throw new Error('Not implemented');
}
