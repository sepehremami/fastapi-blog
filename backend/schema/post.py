from pydantic import BaseModel
from schema import UserOut


class PostCreate(BaseModel):

    title:str
    description:str


class PostBase(PostCreate):
    id:int
    user:UserOut
    class Cofing:
        orm_mode = True


