from pydantic import BaseModel


class Posts(BaseModel):
    title:str
    description:str
    
    class Config:
        orm_mode = True
