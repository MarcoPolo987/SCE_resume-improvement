from .base import BasePrompt


class ResumeImprovementPrompt(BasePrompt):
    """Prompt for resume improvement suggestions."""
    
    def generate(self, resume_text: str, job_text: str) -> str:
        """
        Generate prompt for resume improvement analysis.
        
        Args:
            resume_text: Resume text
            job_text: Job description text
            
        Returns:
            Formatted prompt
        """
        return f"""
        Please analyze the following resume against the job description and provide improvement suggestions:
        
        RESUME:
        {resume_text}
        
        JOB DESCRIPTION:
        {job_text}
        
        Return your analysis in JSON format with the following structure:
        {{
            "original_score": 0.0,
            "new_score": 0.0,
            "details": "Analysis details",
            "commentary": "Overall commentary",
            "improvements": [
                {{
                    "suggestion": "Improvement suggestion",
                    "lineNumber": "Line reference if applicable"
                }}
            ]
        }}
        """
