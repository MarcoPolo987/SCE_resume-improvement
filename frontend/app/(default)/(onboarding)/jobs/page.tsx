import { JobListings } from '@/components/dashboard/job-listings';

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Job Descriptions
          </h1>
          <p className="text-gray-300 text-center mb-8">
            Paste job descriptions to analyze and match with your resume.
          </p>
          <JobListings onUploadJob={async () => null} />
        </div>
      </div>
    </div>
  );
}
