from abc import ABC, abstractmethod
from typing import Dict, Any


class BasePrompt(ABC):
    """Base class for prompt templates."""
    
    @abstractmethod
    def generate(self, **kwargs) -> str:
        """
        Generate prompt text.
        
        Args:
            **kwargs: Template variables
            
        Returns:
            Generated prompt text
        """
        pass
