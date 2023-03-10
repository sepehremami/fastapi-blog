from datetime import datetime
from pydantic import BaseModel
from schema.user import UserBase, UserOut


class PostBase(BaseModel):
    title:str
    description:str
    class Config:
        orm_mode = True

class PostOauth(BaseModel):
    title: str
    description: str
    class Config:
        orm_mode = True

    


