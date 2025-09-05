"""
Job service for handling job description operations.
"""
from typing import Dict, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models import Job, ProcessedJob
import json
import re

def _basic_extract_job(text: str) -> Dict:
    lines = (text or "").splitlines()
    title = next((ln.strip() for ln in lines if ln.strip()), "")
    company = ""
    location = ""
    # crude patterns
    for ln in lines[:10]:
        if re.search(r"\b(remote|hybrid|onsite|[A-Za-z]+,\s*[A-Za-z]+)\b", ln, re.IGNORECASE):
            location = ln.strip()
            break
    description = text
    requirements = []
    benefits = []
    keywords = list({tok.lower() for tok in re.findall(r"[A-Za-z][A-Za-z0-9\-\+\.#]{2,}", text or "")})[:60]
    return {
        "title": title[:120],
        "company": company,
        "location": location[:120],
        "description": description,
        "requirements": requirements,
        "benefits": benefits,
        "keywords": keywords,
    }

class JobService:
    """Service for managing job description data and operations."""
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_and_store_job(self, payload: Dict) -> List[str]:
        # expects: { job_descriptions: List[str], resume_id: str }
        job_ids: List[str] = []
        for text in payload.get("job_descriptions", []):
            job = Job(content=text, user_id=None)
            self.db.add(job)
            await self.db.flush()

            structured = _basic_extract_job(text)
            p = ProcessedJob(
                job_id=job.id,
                structured_data=json.dumps(structured),
                title=structured.get("title"),
                company=structured.get("company"),
                location=structured.get("location"),
            )
            self.db.add(p)
            job_ids.append(str(job.id))

        await self.db.commit()
        return job_ids

    async def get_job_with_processed_data(self, job_id: str) -> Dict:
        stmt = (
            select(Job, ProcessedJob)
            .join(ProcessedJob, ProcessedJob.job_id == Job.id, isouter=True)
            .where(Job.id == int(job_id))
        )
        result = await self.db.execute(stmt)
        row = result.first()
        if not row:
            return {}
        job, processed = row
        structured = json.loads(processed.structured_data) if processed else {}
        return {
            "job_id": str(job.id),
            "content": job.content,
            "title": processed.title if processed else structured.get("title"),
            "company": processed.company if processed else structured.get("company"),
            "location": processed.location if processed else structured.get("location"),
            "processed": structured or None,
        }