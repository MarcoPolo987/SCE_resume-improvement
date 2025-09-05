from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from uuid import uuid4
import time


class RequestIDMiddleware(BaseHTTPMiddleware):
    """Middleware to add request ID to all requests."""
    
    async def dispatch(self, request: Request, call_next):
        # Generate request ID
        request_id = str(uuid4())
        request.state.request_id = request_id
        
        # Add request ID to response headers
        response: Response = await call_next(request)
        response.headers["X-Request-ID"] = request_id
        
        return response
