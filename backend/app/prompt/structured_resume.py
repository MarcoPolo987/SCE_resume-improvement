from .base import BasePrompt


class StructuredResumePrompt(BasePrompt):
    """Prompt for extracting structured data from resumes."""
    
    def generate(self, resume_text: str) -> str:
        """
        Generate prompt for resume structure extraction.
        
        Args:
            resume_text: Raw resume text
            
        Returns:
            Formatted prompt
        """
        return f"""
        Please extract structured information from the following resume:
        
        {resume_text}
        
        Return the information in JSON format with the following structure:
        {{
            "personal_info": {{
                "name": "Full Name",
                "email": "email@example.com",
                "phone": "phone number"
            }},
            "summary": "Professional summary",
            "experience": [
                {{
                    "company": "Company Name",
                    "position": "Job Title",
                    "duration": "Start Date - End Date",
                    "description": "Job description"
                }}
            ],
            "education": [
                {{
                    "institution": "University Name",
                    "degree": "Degree Type",
                    "year": "Graduation Year"
                }}
            ],
            "skills": ["skill1", "skill2", "skill3"]
        }}
        """
