/**
 * Fixture data for local development and testing.
 */

export const FakeJob = { 
  title: 'Software Engineer', 
  company: 'Acme Corp', 
  location: 'Remote' 
};

export const FakeImprove = {
  request_id: 'req-stub',
  data: {
    resume_id: 'stub-resume',
    job_id: 'stub-job',
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
