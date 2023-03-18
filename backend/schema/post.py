from datetime import datetime
from pydantic import BaseModel
from database.models import User
from schema.user import UserBase, UserOut


class PostCreate(BaseModel):

    title:str
    description:str


class PostBase(PostCreate):
    id:int
    user:UserOut
    class Cofing:
        orm_mode = True


