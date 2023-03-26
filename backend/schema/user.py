from datetime import datetime
from pydantic import BaseModel, EmailStr, constr


class UserBase(BaseModel):
    username:str
    email:EmailStr
    phone:str
    # password:str
    
    class Config:
        orm_mode = True

class UserOut(BaseModel):
    id:int
    username: str
    email: str
    created_at: datetime
    class Config:
        orm_mode=True

        
class UserCreate(UserBase):
    password: constr(min_length=8, max_length=100, regex="((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})")