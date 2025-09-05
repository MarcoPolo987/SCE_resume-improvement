from sqlalchemy import Column, String, Text, ForeignKey, Integer
from sqlalchemy.orm import relationship
from app.core.database import Base
from .base import TimestampMixin, IDMixin


class Job(Base, IDMixin, TimestampMixin):
    """Raw job description data model."""
    __tablename__ = "jobs"
    
    content = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Relationship to processed job
    processed_job = relationship("ProcessedJob", back_populates="job", uselist=False)


class ProcessedJob(Base, IDMixin, TimestampMixin):
    """Processed job description data model."""
    __tablename__ = "processed_jobs"
    
    job_id = Column(Integer, ForeignKey("jobs.id"), nullable=False)
    structured_data = Column(Text, nullable=False)  # JSON string
    title = Column(String(255), nullable=True)
    company = Column(String(255), nullable=True)
    location = Column(String(255), nullable=True)
    
    # Relationship to raw job
    job = relationship("Job", back_populates="processed_job")
