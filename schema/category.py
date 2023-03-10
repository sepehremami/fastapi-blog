from pydantic import BaseModel


class Category(BaseModel):
    name:str
    
    class Config:
        orm_mode = True