from fastapi import APIRouter

health_router = APIRouter()


@health_router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "message": "Resume Matcher API is running"}
