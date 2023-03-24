from datetime import datetime
from pydantic import BaseModel, EmailStr, constr


class UserBase(BaseModel):
    username:str
    email:EmailStr
    phone:str
    
    class Config:
        orm_mode = True

class UserOut(UserBase):
    id:int
    created_at:datetime
    is_superuser:bool


        
class UserCreate(UserBase):
    password: constr(min_length=8, max_length=100, regex="((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})")