from sqlalchemy import Column, String, Text
from .base import Base, TimestampMixin, IDMixin


class User(Base, IDMixin, TimestampMixin):
    """User model."""
    __tablename__ = "users"
    
    email = Column(String(255), unique=True, nullable=False)
    name = Column(String(255), nullable=True)
    preferences = Column(Text, nullable=True)  # JSON string
