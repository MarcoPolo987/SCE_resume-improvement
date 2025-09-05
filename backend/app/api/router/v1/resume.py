"""
Resume API router for handling resume-related endpoints.
"""
from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import uuid4
from app.core import get_db_session
from app.services import ResumeService

resume_router = APIRouter()


@resume_router.post(
    "/upload",
    summary="Upload and store a resume",
    status_code=status.HTTP_201_CREATED,
)
async def upload_resume(
    content: str,
    content_type: str,
    request: Request,
    db: AsyncSession = Depends(get_db_session),
):
    """
    Upload a resume and store it in the database.
    
    Args:
        content: The resume content as string
        content_type: MIME type of the content
        request: FastAPI request object
        db: Database session
        
    Returns:
        Dictionary with message, resume_id, and request_id
    """
    request_id = getattr(request.state, "request_id", str(uuid4()))
    svc = ResumeService(db)
    
    # TODO: (backend) Implement actual resume upload logic
    resume_id = await svc.create_and_store_resume(content, content_type)
    
    return {
        "message": "Resume uploaded successfully",
        "resume_id": resume_id,
        "request": {"request_id": request_id}
    }


@resume_router.get(
    "/",
    summary="Get resume data by ID",
    status_code=status.HTTP_200_OK,
)
async def get_resume(
    resume_id: str,
    request: Request,
    db: AsyncSession = Depends(get_db_session),
):
    """
    Retrieve resume data including raw content and processed information.
    
    Args:
        resume_id: Unique identifier for the resume
        request: FastAPI request object
        db: Database session
        
    Returns:
        Dictionary containing combined raw + processed resume data
    """
    request_id = getattr(request.state, "request_id", str(uuid4()))
    svc = ResumeService(db)
    
    # TODO: (backend) Implement actual resume retrieval logic
    resume_data = await svc.get_resume_with_processed_data(resume_id)
    
    return {
        "request_id": request_id,
        **resume_data
    }
