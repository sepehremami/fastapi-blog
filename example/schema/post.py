from typing import Optional
from pydantic import BaseModel, constr, EmailStr
from datetime import datetime


class PostBase(BaseModel):
    title: str
    description: str
   