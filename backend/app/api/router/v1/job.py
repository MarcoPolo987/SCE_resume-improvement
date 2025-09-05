"""
Job API router for handling job description-related endpoints.
"""
from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import uuid4
from app.core import get_db_session
from app.services import JobService

job_router = APIRouter()

@job_router.post(
    "/upload",
    summary="Upload and store job descriptions",
    status_code=status.HTTP_201_CREATED,
)
async def upload_job_descriptions(
    payload: dict,
    request: Request,
    db: AsyncSession = Depends(get_db_session),
):
    request_id = getattr(request.state, "request_id", str(uuid4()))
    svc = JobService(db)
    job_ids = await svc.create_and_store_job(payload)
    return {
        "message": "Job descriptions uploaded successfully",
        "job_id": job_ids,
        "request": {"request_id": request_id}
    }

@job_router.get(
    "/",
    summary="Get job data by ID",
    status_code=status.HTTP_200_OK,
)
async def get_job(
    job_id: str,
    request: Request,
    db: AsyncSession = Depends(get_db_session),
):
    request_id = getattr(request.state, "request_id", str(uuid4()))
    svc = JobService(db)
    job_data = await svc.get_job_with_processed_data(job_id)
    return {
        "request_id": request_id,
        **job_data
    }