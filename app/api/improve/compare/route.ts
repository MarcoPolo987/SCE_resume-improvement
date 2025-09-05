import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Schema for request validation
const CompareRequestSchema = z.object({
  resume_id: z.string().min(1, "Resume ID is required").regex(/^resume_\d+_[a-z0-9]+$/, "Invalid resume ID format"),
  job_text: z.string().min(10, "Job description must be at least 10 characters").max(10000, "Job description too long")
})

// Deterministic score generator based on input
function generateDeterministicScores(resumeId: string, jobText: string) {
  // Create a simple hash from inputs for consistent results
  const hash = resumeId.split('_')[2] + jobText.length + jobText.split(' ').length
  const seed = parseInt(hash, 36) % 1000
  
  // Use seed to generate consistent scores
  const originalScore = 45 + (seed % 30) // 45-75%
  const newScore = 75 + ((seed * 7) % 20) // 75-95%
  
  return { originalScore, newScore }
}

// Deterministic keyword extraction based on job text
function extractKeywords(jobText: string) {
  const commonTechKeywords = [
    'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java', 'C++', 'C#',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Git', 'Agile', 'Scrum',
    'CI/CD', 'Testing', 'SQL', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL',
    'REST', 'API', 'Microservices', 'DevOps', 'Linux', 'Windows', 'macOS'
  ]
  
  const matchedKeywords: string[] = []
  const missingKeywords: string[] = []
  
  const jobTextLower = jobText.toLowerCase()
  
  commonTechKeywords.forEach(keyword => {
    if (jobTextLower.includes(keyword.toLowerCase())) {
      matchedKeywords.push(keyword)
    } else {
      missingKeywords.push(keyword)
    }
  })
  
  return { matchedKeywords, missingKeywords }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body using Zod schema
    const validationResult = CompareRequestSchema.safeParse(body)

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => err.message).join(", ")
      return NextResponse.json({ 
        error: "Invalid request",
        message: errors,
        details: validationResult.error.errors
      }, { status: 400 })
    }

    const { resume_id, job_text } = validationResult.data

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
    const response = await fetch(`${apiBaseUrl}/analyze`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resume_id,
        job_description: job_text
      })
    })
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`)
    }
    
    const result = await response.json()
    return NextResponse.json(result)
    */

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate deterministic scores and keywords
    const { originalScore, newScore } = generateDeterministicScores(resume_id, job_text)
    const { matchedKeywords, missingKeywords } = extractKeywords(job_text)

    // Deterministic request ID
    const requestId = `req_${Date.now()}_${resume_id.split('_')[2]}`

    // Mock analysis result with deterministic data
    const mockResult = {
      request_id: requestId,
      data: {
        resume_id,
        job_id: null,
        original_score: originalScore,
        new_score: newScore,
        resume_preview: {
          personalInfo: {
            name: "John Doe",
            email: "john.doe@email.com",
            phone: "(555) 123-4567",
          },
          summary:
            "Experienced software developer with 5+ years in full-stack development, specializing in React, Node.js, and cloud technologies.",
          experience: [],
          education: [],
          skills: [],
        },
        details: `Analysis shows ${originalScore >= 60 ? 'strong' : 'moderate'} alignment between your technical skills and the job requirements. Your experience with ${matchedKeywords.slice(0, 3).join(', ')} directly matches the primary technologies mentioned in the job description.\n\nKey strengths identified:\n• Strong frontend development background\n• Relevant project experience\n• Good technical skill coverage\n\nAreas for improvement:\n• Could emphasize cloud platform experience more prominently\n• Consider highlighting specific project outcomes and metrics`,
        commentary:
          `Your resume demonstrates ${originalScore >= 60 ? 'solid' : 'developing'} technical competency for this role. The combination of frontend expertise and full-stack experience aligns ${originalScore >= 60 ? 'well' : 'moderately'} with the position requirements. To strengthen your application, consider quantifying your achievements and emphasizing any experience with the specific technologies mentioned in the job posting.`,
        improvements: [
          {
            suggestion: "Add specific metrics to your project descriptions (e.g., 'Improved page load time by 40%')",
            lineNumber: "15",
          },
          {
            suggestion: "Highlight experience with cloud platforms (AWS, Azure, GCP) if applicable",
            lineNumber: null,
          },
          {
            suggestion: "Include any relevant certifications or recent training",
            lineNumber: "8",
          },
        ],
        matched_keywords: matchedKeywords.slice(0, 6), // Limit to 6 for consistency
        missing_keywords: missingKeywords.slice(0, 5), // Limit to 5 for consistency
      },
    }

    return NextResponse.json(mockResult)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ 
      error: "Analysis failed",
      message: "An unexpected error occurred during analysis. Please try again."
    }, { status: 500 })
  }
}
