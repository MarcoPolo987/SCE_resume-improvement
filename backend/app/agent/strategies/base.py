from abc import ABC, abstractmethod
from typing import Dict, Any


class BaseStrategy(ABC):
    """Base class for processing strategies."""
    
    @abstractmethod
    async def process(self, text: str, **kwargs) -> Dict[str, Any]:
        """
        Process text using the strategy.
        
        Args:
            text: Input text
            **kwargs: Additional parameters
            
        Returns:
            Processed result dictionary
        """
        pass
