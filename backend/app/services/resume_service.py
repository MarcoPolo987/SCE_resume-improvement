"""
Resume service for handling resume operations.
"""
from typing import Dict, List, Optional, Tuple
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models import Resume, ProcessedResume
from pydantic import BaseModel
import json
import re

def _basic_extract_resume(text: str) -> Dict:
    # Very naive structured extract
    email = re.search(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", text or "")
    phone = re.search(r"(\+?\d[\d\-\s()]{7,}\d)", text or "")

    # Try to guess name from first non-empty line
    first_line = next((ln.strip() for ln in (text or "").splitlines() if ln.strip()), "")
    name = first_line[:120]

    # Simple skills scraping: look for a "Skills" line and collect the next 3 lines
    skills: List[str] = []
    lines = (text or "").splitlines()
    for i, ln in enumerate(lines):
        if re.search(r"^\s*skills?\s*[:\-]?", ln, re.IGNORECASE):
            for j in range(1, 6):
                if i + j < len(lines):
                    skills.extend([tok.strip(" •,;") for tok in lines[i + j].split(",") if tok.strip()])
            break

    return {
        "personal_info": {
            "name": name,
            "email": email.group(0) if email else "",
            "phone": phone.group(0) if phone else "",
        },
        "summary": None,
        "experience": [],
        "education": [],
        "skills": skills[:50],
        "keywords": [*set(skills[:50])]
    }

class ResumeService:
    """Service for managing resume data and operations."""
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_and_store_resume(self, content: str, content_type: str) -> str:
        resume = Resume(content=content, content_type=content_type)
        self.db.add(resume)
        await self.db.flush()  # get resume.id

        structured = _basic_extract_resume(content)
        processed = ProcessedResume(
            resume_id=resume.id,
            structured_data=json.dumps(structured),
            keywords=json.dumps(structured.get("keywords", [])),
        )
        self.db.add(processed)
        await self.db.commit()
        return str(resume.id)

    async def get_resume_with_processed_data(self, resume_id: str) -> Dict:
        stmt = (
            select(Resume, ProcessedResume)
            .join(ProcessedResume, ProcessedResume.resume_id == Resume.id, isouter=True)
            .where(Resume.id == int(resume_id))
        )
        result = await self.db.execute(stmt)
        row = result.first()
        if not row:
            return {}

        resume, processed = row
        data = {
            "resume_id": str(resume.id),
            "content": resume.content,
            "content_type": resume.content_type,
            "processed": json.loads(processed.structured_data) if processed else None,
        }
        return data

    async def extract_resume_keywords(self, resume_id: str) -> List[str]:
        stmt = select(ProcessedResume).where(ProcessedResume.resume_id == int(resume_id))
        res = await self.db.execute(stmt)
        pr = res.scalar_one_or_none()
        if not pr:
            return []
        try:
            data = json.loads(pr.keywords or "[]")
            if isinstance(data, list):
                return data
        except Exception:
            pass
        return []