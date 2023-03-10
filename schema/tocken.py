

from typing import Optional
from pydantic import BaseModel


class Tocken(BaseModel):
    access_tocken: str
    tocken_type: str 

class TockenData(BaseModel):
    id: Optional[str]