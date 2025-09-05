from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Database
    sync_database_url: str = "sqlite:///./app.db"
    async_database_url: str = "sqlite+aiosqlite:///./app.db"
    
    # Security
    session_secret_key: str = "a-secret-key"
    
    # LLM Configuration
    llm_provider: str = "ollama"
    llm_model: str = "gemma3:4b"
    llm_api_key: Optional[str] = None
    llm_base_url: Optional[str] = None
    
    # Embedding Configuration
    embedding_provider: str = "ollama"
    embedding_model: str = "dengcao/Qwen3-Embedding-0.6B:Q8_0"
    embedding_api_key: Optional[str] = None
    embedding_base_url: Optional[str] = None
    
    # Application
    debug: bool = False
    host: str = "0.0.0.0"
    port: int = 8000
    
    class Config:
        env_file = ".env"
        case_sensitive = False
        extra = "ignore"


settings = Settings()
