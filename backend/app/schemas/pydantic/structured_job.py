from pydantic import BaseModel, Field
from typing import List, Optional


class StructuredJobModel(BaseModel):
    """Structured job description model."""
    title: str = Field(..., description="Job title")
    company: str = Field(..., description="Company name")
    location: str = Field(..., description="Job location")
    description: str = Field(..., description="Job description")
    requirements: List[str] = Field(default_factory=list, description="Job requirements")
    benefits: List[str] = Field(default_factory=list, description="Job benefits")
    keywords: List[str] = Field(default_factory=list, description="Extracted keywords")
