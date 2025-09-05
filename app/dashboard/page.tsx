import { Header } from "@/components/shell/Header"
import { UploadResumeCard } from "@/components/cards/UploadResumeCard"
import { AnalyzeCard } from "@/components/cards/AnalyzeCard"
import { ResumePreviewerProvider } from "@/contexts/ResumePreviewerContext"

export default function DashboardPage() {
  return (
    <ResumePreviewerProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <UploadResumeCard />
            <AnalyzeCard />
          </div>
        </main>
      </div>
    </ResumePreviewerProvider>
  )
}
