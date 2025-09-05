"""
V1 API router package.
"""
from fastapi import APIRouter
from .resume import resume_router
from .job import job_router
from .improve import improve_router

v1_router = APIRouter()

# Include all v1 routers
v1_router.include_router(resume_router, prefix="/resumes", tags=["resumes"])
v1_router.include_router(job_router, prefix="/jobs", tags=["jobs"])
v1_router.include_router(improve_router, prefix="/improve", tags=["improve"])
