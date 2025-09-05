"""
Resume API router for handling resume-related endpoints.
"""
from fastapi import APIRouter, Depends, Request, status, UploadFile, File, Body
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import uuid4
from app.core import get_db_session
from app.services import ResumeService
from pypdf import PdfReader

resume_router = APIRouter()

@resume_router.post(
    "/upload",
    summary="Upload a resume file (PDF, TXT, MD)",
    status_code=status.HTTP_201_CREATED,
)
async def upload_resume_file(
    request: Request,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db_session),
):
    request_id = getattr(request.state, "request_id", str(uuid4()))
    content_type = file.content_type or "application/octet-stream"

    if content_type == "application/pdf":
        # Extract text from PDF
        data = await file.read()
        import io
        reader = PdfReader(io.BytesIO(data))
        pages = [p.extract_text() or "" for p in reader.pages]
        text = "\n".join(pages)
        content = text
        stored_type = "application/pdf"
    else:
        # treat as text
        content_bytes = await file.read()
        content = content_bytes.decode("utf-8", errors="ignore")
        stored_type = "text/plain" if content_type.startswith("text/") else "text/plain"

    svc = ResumeService(db)
    resume_id = await svc.create_and_store_resume(content, stored_type)
    return {
        "message": "Resume uploaded successfully",
        "resume_id": resume_id,
        "request": {"request_id": request_id}
    }

@resume_router.post(
    "/upload-text",
    summary="Upload a resume as raw text",
    status_code=status.HTTP_201_CREATED,
)
async def upload_resume_text(
    content: str = Body(..., embed=True),
    content_type: str = Body("text/plain", embed=True),
    request: Request = None,
    db: AsyncSession = Depends(get_db_session),
):
    request_id = getattr(request.state, "request_id", str(uuid4()))
    svc = ResumeService(db)
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
    request_id = getattr(request.state, "request_id", str(uuid4()))
    svc = ResumeService(db)
    resume_data = await svc.get_resume_with_processed_data(resume_id)
    return {
        "request_id": request_id,
        **resume_data
    }