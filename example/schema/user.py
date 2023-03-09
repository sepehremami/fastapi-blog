from typing import Optional
from pydantic import BaseModel, constr, EmailStr
from datetime import datetime

password_regex = "((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})"

class User(BaseModel):
    username: constr(min_length=7, max_length=100)
    email: EmailStr
    created_at: datetime = datetime.now()

class UserUpdate(User):
    username: constr(min_length=7, max_length=100) = None
    email: EmailStr = None
    

class UserBase(User):
    password: constr(min_length=7, max_length=100, regex=password_regex)

class UserOut(BaseModel):
    username: str
    email: str
    created_at: datetime
    class Config:
        orm_mode=True
    
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Tocken(BaseModel):
    access_toclen: str

class TockenData(BaseModel):
    id: Optional[str]