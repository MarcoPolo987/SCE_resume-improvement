from sqlalchemy import Column, Integer, DateTime, func

class TimestampMixin:
    """Mixin to add timestamp fields to models."""
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

class IDMixin:
    """Mixin to add ID field to models."""
    id = Column(Integer, primary_key=True, autoincrement=True)
