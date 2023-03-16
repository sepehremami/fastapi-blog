from pydantic import BaseModel

class Tocken(BaseModel):
    access_tocken: str
    tocken_type: str 

class TokenData(BaseModel):
    username: str | None = None