from pydantic import BaseModel

class CommentBase(BaseModel):
    post_id:int
    parent_id:int
    description:str

    class Config:
        orm_mode = True

