from app.core.database import Base  # single source of truth
from .resume import Resume, ProcessedResume
from .job import Job, ProcessedJob
from .user import User

__all__ = ["Base", "Resume", "ProcessedResume", "Job", "ProcessedJob", "User"]
