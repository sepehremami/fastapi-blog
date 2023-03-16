from pydantic import BaseModel



class CommentBase(BaseModel):
    description:str
    class Config:
        orm_mode = True

class CommentOauth(BaseModel):
    description: str
    class Config:
        orm_mode = True

