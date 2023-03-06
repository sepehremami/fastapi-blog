from pydantic import BaseModel


class User(BaseModel):
    fullname:str
    username:str
    email:str
    phone:str
    password:str
    
    class Config:
        orm_mode = True