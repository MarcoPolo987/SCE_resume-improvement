import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { resume_id, job_text } = await request.json()

    if (!resume_id || !job_text) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock analysis result
    const mockResult = {
      request_id: `req_${Date.now()}`,
      data: {
        resume_id,
        job_id: null,
        original_score: Math.floor(Math.random() * 30) + 45, // 45-75%
        new_score: Math.floor(Math.random() * 20) + 75, // 75-95%
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
        details: `Analysis shows strong alignment between your technical skills and the job requirements. Your experience with React and TypeScript directly matches the primary technologies mentioned in the job description.\n\nKey strengths identified:\n• Strong frontend development background\n• Relevant project experience\n• Good technical skill coverage\n\nAreas for improvement:\n• Could emphasize cloud platform experience more prominently\n• Consider highlighting specific project outcomes and metrics`,
        commentary:
          "Your resume demonstrates solid technical competency for this role. The combination of frontend expertise and full-stack experience aligns well with the position requirements. To strengthen your application, consider quantifying your achievements and emphasizing any experience with the specific technologies mentioned in the job posting.",
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
        matched_keywords: ["React", "TypeScript", "JavaScript", "Node.js", "Git", "Agile"],
        missing_keywords: ["AWS", "Docker", "Kubernetes", "CI/CD", "Testing"],
      },
    }

    return NextResponse.json(mockResult)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
