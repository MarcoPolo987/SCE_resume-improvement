import { FileUpload } from '@/components/common/file-upload';

export default function ResumeUploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Upload Your Resume
          </h1>
          <p className="text-gray-300 text-center mb-8">
            Upload your resume to get started with the matching process.
          </p>
          <FileUpload />
        </div>
      </div>
    </div>
  );
}
