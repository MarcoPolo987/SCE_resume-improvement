from pydantic import BaseModel, Field
from typing import List, Optional


class StructuredResumeModel(BaseModel):
    """Structured resume data model."""
    personal_info: dict = Field(..., description="Personal information")
    summary: Optional[str] = Field(None, description="Professional summary")
    experience: List[dict] = Field(default_factory=list, description="Work experience")
    education: List[dict] = Field(default_factory=list, description="Education")
    skills: List[str] = Field(default_factory=list, description="Skills list")
    keywords: List[str] = Field(default_factory=list, description="Extracted keywords")
