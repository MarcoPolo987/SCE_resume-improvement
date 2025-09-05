from sqlalchemy import Column, Integer, DateTime, func
from sqlalchemy.ext.declarative import declared_attr
from . import Base


class TimestampMixin:
    """Mixin to add timestamp fields to models."""
    
    @declared_attr
    def created_at(cls):
        return Column(DateTime, default=func.now(), nullable=False)
    
    @declared_attr
    def updated_at(cls):
        return Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)


class IDMixin:
    """Mixin to add ID field to models."""
    
    @declared_attr
    def id(cls):
        return Column(Integer, primary_key=True, autoincrement=True)
