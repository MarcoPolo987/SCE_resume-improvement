from .base import BasePrompt


class StructuredJobPrompt(BasePrompt):
    """Prompt for extracting structured data from job descriptions."""
    
    def generate(self, job_text: str) -> str:
        """
        Generate prompt for job description structure extraction.
        
        Args:
            job_text: Raw job description text
            
        Returns:
            Formatted prompt
        """
        return f"""
        Please extract structured information from the following job description:
        
        {job_text}
        
        Return the information in JSON format with the following structure:
        {{
            "title": "Job Title",
            "company": "Company Name",
            "location": "Job Location",
            "description": "Job description",
            "requirements": ["requirement1", "requirement2"],
            "benefits": ["benefit1", "benefit2"],
            "keywords": ["keyword1", "keyword2"]
        }}
        """
