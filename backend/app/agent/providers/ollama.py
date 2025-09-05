from typing import Dict, Any
from .base import BaseProvider


class OllamaProvider(BaseProvider):
    """Ollama provider for local LLM inference."""
    
    def __init__(self):
        # TODO: Initialize Ollama client
        pass
    
    async def generate(self, prompt: str, **kwargs) -> str:
        """
        Generate text using Ollama.
        
        Args:
            prompt: Input prompt
            **kwargs: Additional parameters
            
        Returns:
            Generated text
        """
        # TODO: Implement Ollama text generation
        raise NotImplementedError("Ollama generate not implemented")
    
    async def embed(self, text: str) -> list[float]:
        """
        Generate embeddings using Ollama.
        
        Args:
            text: Input text
            
        Returns:
            Embedding vector
        """
        # TODO: Implement Ollama embeddings
        raise NotImplementedError("Ollama embed not implemented")
