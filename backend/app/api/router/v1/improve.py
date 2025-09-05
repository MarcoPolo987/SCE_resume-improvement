"""
Improve API router for handling resume improvement requests.
"""
from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import uuid4
from app.core import get_db_session
from app.services import ScoreImprovementService
from app.schemas.pydantic.improve import ImproveRequest

improve_router = APIRouter()


@improve_router.post(
    "/improve",
    summary="Return placeholder resume improvement payload",
    status_code=status.HTTP_200_OK,
)
async def improve_resume(
    payload: ImproveRequest,
    request: Request,
    db: AsyncSession = Depends(get_db_session),
):
    """
    Skeleton endpoint. Calls ScoreImprovementService.improve() and returns a placeholder.
    
    Args:
        payload: ImproveRequest containing resume_id and job_id
        request: FastAPI request object
        db: Database session
        
    Returns:
        Dictionary with request_id and improvement data
    """
    request_id = getattr(request.state, "request_id", str(uuid4()))
    svc = ScoreImprovementService(db)
    data = await svc.improve(str(payload.resume_id), str(payload.job_id))
    return {"request_id": request_id, **data}
