"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useResumePreviewer } from "@/contexts/ResumePreviewerContext"

type UploadStatus = "idle" | "uploading" | "parsing" | "success" | "error"

export function UploadResumeCard() {
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const { setResumeId } = useResumePreviewer()

  const uploadFile = async (file: File) => {
    setStatus("uploading")
    setError(null)
    setFileName(file.name)

    try {
      if (file.type === "application/pdf") {
        // Upload PDF file
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/resumes/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Upload failed")

        const data = await response.json()
        setResumeId(data.resume_id)
      } else {
        // Upload text content
        setStatus("parsing")
        const content = await file.text()

        const response = await fetch("/api/resumes/upload-text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content,
            content_type: file.type || "text/plain",
          }),
        })

        if (!response.ok) throw new Error("Upload failed")

        const data = await response.json()
        setResumeId(data.resume_id)
      }

      setStatus("success")
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Upload failed")
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      uploadFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "text/markdown": [".md"],
    },
    maxFiles: 1,
  })

  const getStatusIcon = () => {
    switch (status) {
      case "uploading":
      case "parsing":
        return <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "uploading":
        return "Uploading..."
      case "parsing":
        return "Parsing resume..."
      case "success":
        return `Successfully uploaded: ${fileName}`
      case "error":
        return `Error: ${error}`
      default:
        return "No file uploaded"
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Resume</h2>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          {isDragActive ? "Drop your resume here" : "Drag & drop your resume"}
        </p>
        <p className="text-gray-500 mb-4">or</p>
        <Button variant="outline" disabled={status === "uploading" || status === "parsing"}>
          Choose File
        </Button>
      </div>

      <div className="mt-6 flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
        {getStatusIcon()}
        <span className="text-sm font-medium text-gray-700">{getStatusText()}</span>
      </div>

      {status === "success" && (
        <Alert className="mt-4 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Resume uploaded successfully! You can now analyze it against job descriptions.
          </AlertDescription>
        </Alert>
      )}

      {status === "error" && (
        <Alert className="mt-4 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {error}
            <Button variant="link" className="p-0 h-auto text-red-600 underline ml-2" onClick={() => setStatus("idle")}>
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <p className="text-sm text-gray-500 mt-4">Supports PDF, Markdown, and plain text files.</p>
    </div>
  )
}
