from fastapi import Depends, HTTPException
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from app import models
from app.database import get_db
from fastapi import status
from schema.user import User
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash(password:str):
    return pwd_context.hash(password)

def verify(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user(username:str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username==username)
    if not user: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return User(**user.dict())

def authenticate_user(username:str, password:str):
    user = get_user(username)
    if not user:
        return False
    if not verify(user.password, password):
        return False
    return user 
   