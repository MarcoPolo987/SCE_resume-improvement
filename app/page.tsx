import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Zap, Target } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">Resume Matcher</h1>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Compare your resume against job descriptions with AI-powered analysis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Resume</h3>
              <p className="text-gray-600">Support for PDF, Markdown, and plain text files</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Match Analysis</h3>
              <p className="text-gray-600">AI-powered comparison with detailed insights</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Get Improvements</h3>
              <p className="text-gray-600">Actionable suggestions to boost your match score</p>
            </div>
          </div>

          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              Open Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
