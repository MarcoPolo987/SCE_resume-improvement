import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Schema for file validation
const FileSchema = z.object({
  name: z.string().min(1, "File name is required"),
  size: z.number().min(1, "File cannot be empty").max(10 * 1024 * 1024, "File size must be less than 10MB"),
  type: z.string().refine(
    (type) => {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ]
      return allowedTypes.includes(type)
    },
    "File must be PDF, DOC, DOCX, or TXT format"
  )
})

// Deterministic ID generator based on file content
function generateDeterministicId(file: File): string {
  const seed = file.name.length + file.size + file.lastModified
  const timestamp = Math.floor(Date.now() / 1000) // Round to seconds for consistency
  return `resume_${timestamp}_${seed.toString(36)}`
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    // Validate file exists
    if (!file) {
      return NextResponse.json({ 
        error: "No file provided",
        message: "Please select a file to upload"
      }, { status: 400 })
    }

    // Validate file using Zod schema
    const validationResult = FileSchema.safeParse({
      name: file.name,
      size: file.size,
      type: file.type
    })

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => err.message).join(", ")
      return NextResponse.json({ 
        error: "Invalid file",
        message: errors,
        details: validationResult.error.errors
      }, { status: 400 })
    }

    // Get API token from environment variables
    const apiToken = process.env.API_TOKEN
    const apiBaseUrl = process.env.API_BASE_URL

    if (!apiToken) {
      return NextResponse.json({ 
        error: "API token not configured",
        message: "Server configuration error. Please contact support."
      }, { status: 500 })
    }

    // TODO: Replace this with actual API call to your service
    // Example API call structure:
    /*
    const response = await fetch(`${apiBaseUrl}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    })
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`)
    }
    
    const result = await response.json()
    return NextResponse.json(result)
    */

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate deterministic resume ID
    const resumeId = generateDeterministicId(file)

    return NextResponse.json({ 
      resume_id: resumeId,
      message: "File uploaded successfully"
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ 
      error: "Upload failed",
      message: "An unexpected error occurred. Please try again."
    }, { status: 500 })
  }
}
