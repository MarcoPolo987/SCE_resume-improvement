from sqlalchemy import Column, String, Text
from app.core.database import Base
from .base import TimestampMixin, IDMixin


class User(Base, IDMixin, TimestampMixin):
    """User model."""
    __tablename__ = "users"
    
    email = Column(String(255), unique=True, nullable=False)
    name = Column(String(255), nullable=True)
    preferences = Column(Text, nullable=True)  # JSON string
