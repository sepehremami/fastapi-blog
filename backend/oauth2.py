from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from database import models, get_db
from sqlalchemy.orm import Session
from config import settings


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login",
    scheme_name="JWT")


SECRET_KEY = settings.secret_key


ALGORYTHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = int(settings.access_tocken_expire_minutes)


def create_access_tocken(data:dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORYTHM)
    return encoded_jwt


def get_current_user(access_token = Depends(oauth2_scheme), db:Session = Depends(get_db)):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="could not validate credentials",
        headers={"WWW-Authenticate":"Bearer"})

    try:
        payload: dict = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORYTHM])

        user_id: str = payload.get("user_id")

        if user_id is None:
            raise credentials_exception
        
    except JWTError:
        raise credentials_exception
    current_user = db.query(models.Users).filter(models.Users.id == user_id).first()
    if current_user is None:
        raise credentials_exception
    return current_user

