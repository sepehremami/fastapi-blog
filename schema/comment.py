from pydantic import BaseModel


class Comment(BaseModel):
    description:str
    
    class Config:
        orm_mode = True