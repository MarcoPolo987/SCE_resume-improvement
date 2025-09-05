"""
Score improvement service for analyzing and improving resume-job matches.
"""
from typing import Dict
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models import Resume, ProcessedResume, Job, ProcessedJob
import json

class ScoreImprovementService:
    """Service for analyzing resume-job matches and providing improvement suggestions."""
    def __init__(self, db: AsyncSession):
        self.db = db

    async def improve(self, resume_id: str, job_id: str) -> Dict:
        # Load processed resume
        r_stmt = (
            select(Resume, ProcessedResume)
            .join(ProcessedResume, ProcessedResume.resume_id == Resume.id, isouter=True)
            .where(Resume.id == int(resume_id))
        )
        r_res = await self.db.execute(r_stmt)
        r_row = r_res.first()
        resume_struct = json.loads(r_row[1].structured_data) if r_row and r_row[1] else {}

        # Load processed job
        j_stmt = (
            select(Job, ProcessedJob)
            .join(ProcessedJob, ProcessedJob.job_id == Job.id, isouter=True)
            .where(Job.id == int(job_id))
        )
        j_res = await self.db.execute(j_stmt)
        j_row = j_res.first()
        job_struct = json.loads(j_row[1].structured_data) if j_row and j_row[1] else {}

        # Placeholder scores; in the future, call AgentManager + prompts
        return {
            "data": {
                "resume_id": str(resume_id),
                "job_id": str(job_id),
                "original_score": 0,
                "new_score": 0,
                "resume_preview": {
                    "personalInfo": {
                        "name": resume_struct.get("personal_info", {}).get("name", ""),
                        "email": resume_struct.get("personal_info", {}).get("email", ""),
                        "phone": resume_struct.get("personal_info", {}).get("phone", "")
                    },
                    "summary": resume_struct.get("summary"),
                    "experience": resume_struct.get("experience", []),
                    "education": resume_struct.get("education", []),
                    "skills": resume_struct.get("skills", []),
                },
                "details": "TODO: analysis details",
                "commentary": "TODO: commentary",
                "improvements": []
            }
        }