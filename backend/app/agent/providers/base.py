from abc import ABC, abstractmethod
from typing import Dict, Any


class BaseProvider(ABC):
    """Base class for LLM providers."""
    
    @abstractmethod
    async def generate(self, prompt: str, **kwargs) -> str:
        """
        Generate text using the provider.
        
        Args:
            prompt: Input prompt
            **kwargs: Additional parameters
            
        Returns:
            Generated text
        """
        pass
    
    @abstractmethod
    async def embed(self, text: str) -> list[float]:
        """
        Generate embeddings for text.
        
        Args:
            text: Input text
            
        Returns:
            Embedding vector
        """
        pass
