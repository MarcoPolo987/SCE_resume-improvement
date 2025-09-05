import { ResumePreviewerProvider } from '@/components/common/resume_previewer_context';
import { Dashboard } from '@/components/dashboard/dashboard';

export default function HomePage() {
  return (
    <ResumePreviewerProvider>
      <Dashboard />
    </ResumePreviewerProvider>
  );
}