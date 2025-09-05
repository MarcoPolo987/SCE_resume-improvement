from pydantic import BaseModel, Field
from typing import List


class JobUploadRequest(BaseModel):
    """Request model for uploading job descriptions."""
    job_descriptions: List[str] = Field(..., description="List of job descriptions to upload")
    resume_id: str = Field(..., description="Resume ID to associate with job descriptions")
