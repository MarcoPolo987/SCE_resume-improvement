from typing import Dict, Any
from .base import BaseStrategy


class JSONWrapperStrategy(BaseStrategy):
    """Strategy for wrapping prompts to get JSON responses."""
    
    async def process(self, text: str, **kwargs) -> Dict[str, Any]:
        """
        Process text to get structured JSON response.
        
        Args:
            text: Input text
            **kwargs: Additional parameters
            
        Returns:
            Structured JSON result
        """
        # TODO: Implement JSON wrapping logic
        raise NotImplementedError("JSONWrapperStrategy not implemented")


class MarkdownWrapperStrategy(BaseStrategy):
    """Strategy for wrapping prompts to get Markdown responses."""
    
    async def process(self, text: str, **kwargs) -> Dict[str, Any]:
        """
        Process text to get Markdown response.
        
        Args:
            text: Input text
            **kwargs: Additional parameters
            
        Returns:
            Markdown formatted result
        """
        # TODO: Implement Markdown wrapping logic
        raise NotImplementedError("MarkdownWrapperStrategy not implemented")
