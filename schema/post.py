from datetime import datetime
from pydantic import BaseModel
from database.models import User
from schema.user import UserBase, UserOut


class PostBase(BaseModel):
    id: int
    title:str
    description:str
    user:UserOut
    class Config:
        orm_mode = True

class PostOauth(BaseModel):
    title: str
    description: str
    class Config:
        orm_mode = True

    


