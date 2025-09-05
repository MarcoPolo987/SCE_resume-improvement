"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertTriangle } from "lucide-react"
import { useResumePreviewer } from "@/contexts/ResumePreviewerContext"
import { StatTile } from "@/components/ui/StatTile"
import { KeywordChips } from "@/components/ui/KeywordChips"
import { SectionPanel } from "@/components/ui/SectionPanel"

interface AnalysisResult {
  request_id: string
  data: {
    resume_id: string
    job_id: string | null
    original_score: number
    new_score: number
    resume_preview: {
      personalInfo: { name: string; email: string; phone: string }
      summary: string | null
      experience: any[]
      education: any[]
      skills: any[]
    }
    details: string
    commentary: string
    improvements: { suggestion: string; lineNumber?: string | null }[]
    matched_keywords?: string[]
    missing_keywords?: string[]
  }
}

export function AnalyzeCard() {
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { resumeId } = useResumePreviewer()

  // Load job description from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lastJobDescription")
    if (saved) {
      setJobDescription(saved)
    }
  }, [])

  // Save job description to localStorage
  useEffect(() => {
    if (jobDescription) {
      localStorage.setItem("lastJobDescription", jobDescription)
    }
  }, [jobDescription])

  const analyzeMatch = async () => {
    if (!resumeId || !jobDescription.trim()) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/improve/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_id: resumeId,
          job_text: jobDescription.trim(),
        }),
      })

      if (!response.ok) throw new Error("Analysis failed")

      const data = await response.json()
      setResult(data)

      // Scroll to results
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const canAnalyze = resumeId && jobDescription.trim() && !isAnalyzing

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI Match Analysis</h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="job-description" className="text-base font-medium">
            Job Description
          </Label>
          <Textarea
            id="job-description"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="mt-2 min-h-[140px] resize-none"
            disabled={isAnalyzing}
          />
        </div>

        {!resumeId && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Please upload a resume first to enable analysis.
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={analyzeMatch}
          disabled={!canAnalyze}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Match"
          )}
        </Button>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div id="results-section" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-2 gap-4">
              <StatTile title="Original Score" value={`${result.data.original_score}%`} className="text-gray-600" />
              <StatTile title="Improved Score" value={`${result.data.new_score}%`} className="text-green-600" />
            </div>

            <SectionPanel title="Analysis Details" content={result.data.details} copyable />

            <SectionPanel title="Expert Commentary" content={result.data.commentary} copyable />

            {result.data.matched_keywords && result.data.matched_keywords.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Matched Keywords</h3>
                <KeywordChips keywords={result.data.matched_keywords} variant="matched" />
              </div>
            )}

            {result.data.missing_keywords && result.data.missing_keywords.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Missing Keywords</h3>
                <KeywordChips keywords={result.data.missing_keywords} variant="missing" />
              </div>
            )}

            {result.data.improvements && result.data.improvements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Improvement Suggestions</h3>
                <ol className="space-y-3">
                  {result.data.improvements.map((improvement, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-700">{improvement.suggestion}</p>
                        {improvement.lineNumber && (
                          <p className="text-sm text-gray-500 mt-1">Line: {improvement.lineNumber}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Resume Preview</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="font-medium text-gray-900">{result.data.resume_preview.personalInfo.name}</div>
                <div className="text-sm text-gray-600">
                  {result.data.resume_preview.personalInfo.email} • {result.data.resume_preview.personalInfo.phone}
                </div>
                {result.data.resume_preview.summary && (
                  <p className="text-sm text-gray-700 mt-2">{result.data.resume_preview.summary}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
