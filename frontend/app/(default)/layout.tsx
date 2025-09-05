import { ResumePreviewerProvider } from '@/components/common/resume_previewer_context';
export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <ResumePreviewerProvider>
      <main className="min-h-screen flex flex-col">{children}</main>
    </ResumePreviewerProvider>
  );
}
