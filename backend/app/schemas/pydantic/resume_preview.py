from pydantic import BaseModel, Field
from typing import List, Optional


class PersonalInfo(BaseModel):
    """Personal information model."""
    name: str = Field(..., description="Full name")
    email: str = Field(..., description="Email address")
    phone: str = Field(..., description="Phone number")


class ExperienceEntry(BaseModel):
    """Work experience entry model."""
    company: str = Field(..., description="Company name")
    position: str = Field(..., description="Job position")
    duration: str = Field(..., description="Employment duration")
    description: str = Field(..., description="Job description")


class EducationEntry(BaseModel):
    """Education entry model."""
    institution: str = Field(..., description="Educational institution")
    degree: str = Field(..., description="Degree obtained")
    year: str = Field(..., description="Graduation year")


class ResumePreviewerModel(BaseModel):
    """Resume preview model."""
    personalInfo: PersonalInfo = Field(..., description="Personal information")
    summary: Optional[str] = Field(None, description="Professional summary")
    experience: List[ExperienceEntry] = Field(default_factory=list, description="Work experience")
    education: List[EducationEntry] = Field(default_factory=list, description="Education")
    skills: List[str] = Field(default_factory=list, description="Skills list")
