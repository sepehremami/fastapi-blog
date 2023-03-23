from datetime import datetime
from pydantic import BaseModel
from schema import UserOut


class PostCreate(BaseModel):
    title:str
    description:str

class PostOut(PostCreate):
    id:int
    category_id:int | None 
    created_at:datetime
    user_id:int
    class Config:
        orm_mode = True


class PostBase(PostCreate):
    id:int
    user:UserOut
    class Config:
        orm_mode = True


