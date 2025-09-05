from sqlalchemy import Column, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base, TimestampMixin, IDMixin


class Resume(Base, IDMixin, TimestampMixin):
    """Raw resume data model."""
    __tablename__ = "resumes"
    
    content = Column(Text, nullable=False)
    content_type = Column(String(100), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Relationship to processed resume
    processed_resume = relationship("ProcessedResume", back_populates="resume", uselist=False)


class ProcessedResume(Base, IDMixin, TimestampMixin):
    """Processed resume data model."""
    __tablename__ = "processed_resumes"
    
    resume_id = Column(Integer, ForeignKey("resumes.id"), nullable=False)
    structured_data = Column(Text, nullable=False)  # JSON string
    keywords = Column(Text, nullable=True)  # JSON string of keywords
    
    # Relationship to raw resume
    resume = relationship("Resume", back_populates="processed_resume")
