from pydantic import BaseModel

class CategoryBase(BaseModel):
    name:str
    
    class Config:
        orm_mode = True