from pydantic import BaseModel


class Post(BaseModel):
    title:str
    description:str
    
    class Config:
        orm_mode = True
