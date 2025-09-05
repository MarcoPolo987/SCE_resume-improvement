"""
Pydantic schemas for resume improvement requests.
"""
from pydantic import BaseModel, Field
from uuid import UUID


class ImproveRequest(BaseModel):
    """Request schema for resume improvement analysis."""
    
    resume_id: UUID = Field(..., description="DB UUID for resume")
    job_id: UUID = Field(..., description="DB UUID for job")
