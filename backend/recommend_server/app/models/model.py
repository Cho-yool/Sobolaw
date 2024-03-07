from pydantic import BaseModel

class Precedent(BaseModel):
    precedentId: int = None
    caseName: str = None
    caseNumber: str = None
    judgmentDate: str = None
    judgment: str = None
    courtName: str = None
    caseType: str = None
    verdictType: str = None
    judicialNotice: str = None
    verdictSummary: str = None
    referencedStatute: str = None
    referencedCase: str = None
    caseContent: str = None
    hit: int = None

class Situation(BaseModel):
    situation: str = None

class BaseEntity(BaseModel):
    status: int = None
    message: str = None
    data: object = None

class RecommendPrecedents(BaseModel):
    precedents: list = None
    winRate: int = None