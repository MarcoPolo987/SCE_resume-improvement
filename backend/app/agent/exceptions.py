from ..core.exceptions import AgentError


class ProviderError(AgentError):
    """Raised when provider operations fail."""
    pass


class StrategyError(AgentError):
    """Raised when strategy operations fail."""
    pass
