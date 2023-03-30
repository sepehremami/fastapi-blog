from datetime import datetime
from typing import List
from pydantic import BaseModel
from database.models import Comment
from schema.comment import CommentBase
from schema import UserOut


class PostCreate(BaseModel):
    title:str
    description:str
    category_id:int

    

class PostOut(PostCreate):
    id:int
    category_id:int | None 
    created_at:datetime
    user_id:int |None
    class Config:
        orm_mode = True


class PostBase(PostCreate):
    id:int
    user:UserOut
    class Config:
        orm_mode = True

class PostUpdate(PostCreate):...

class PostForPage(PostOut):
    comments: List[CommentBase]
    class Config:
        orm_mode = True


