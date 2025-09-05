from pydantic import BaseModel, Field
from typing import List, Optional


class ImprovementSuggestion(BaseModel):
    """Improvement suggestion model."""
    suggestion: str = Field(..., description="Improvement suggestion")
    lineNumber: Optional[str] = Field(None, description="Line number reference")


class ResumeImprovementRequest(BaseModel):
    """Resume improvement request model."""
    resume_id: str = Field(..., description="Resume ID")
    job_id: str = Field(..., description="Job ID")
    improvements: List[ImprovementSuggestion] = Field(default_factory=list, description="List of improvements")
