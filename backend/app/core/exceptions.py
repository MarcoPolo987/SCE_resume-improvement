"""Custom exceptions for the Resume Matcher application."""


class ResumeMatcherException(Exception):
    """Base exception for Resume Matcher application."""
    pass


class ValidationError(ResumeMatcherException):
    """Raised when validation fails."""
    pass


class DatabaseError(ResumeMatcherException):
    """Raised when database operations fail."""
    pass


class ServiceError(ResumeMatcherException):
    """Raised when service operations fail."""
    pass


class AgentError(ResumeMatcherException):
    """Raised when agent operations fail."""
    pass
