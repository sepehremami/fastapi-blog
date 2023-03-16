from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from database import models
from database.database import get_db
from sqlalchemy.orm import Session
from config import settings
from schema import user
# Secret Key
# Algorithem
# Expiration

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/login",
    scheme_name="JWT")

SECRET_KEY = settings.secret_key
ALGORYTHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = int(settings.access_tocken_expire_minutes)
# $2b$12$g3iOlG9P92a1/K1Uxl8jJObg2Wm2dwbNbftDYjqsIlXK4fl08alGy

def create_access_tocken(data:dict): # {"user_id": user.id, "exp": expire}
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORYTHM)
    return encoded_jwt


def verify_access_tocken(tocken, credentials_exception):
    try:
        payload = jwt.decode(tocken, SECRET_KEY, algorithms=[ALGORYTHM])
        email  = payload.get("email")
        print(email)
        print(f'email:{email}')
        if id is None:
            raise credentials_exception
        tocken_data = user.TockenData(username=email)
    except JWTError:
        raise credentials_exception
    return tocken_data



def get_current_user(token = Depends(oauth2_scheme), db:Session = Depends(get_db)):
    # print(token)
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="could not validate credentials",
        headers={"WWW-Authenticate":"Bearer"})

    try:
        # payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORYTHM])
        # email: str = payload.get("email")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORYTHM])
        email: str = payload.get("email")
        print(email)
        if email is None:
            raise credentials_exception
        token_data = user.TokenData(username=email)
    except JWTError:
        raise credentials_exception
    current_user = db.query(models.User).filter(models.User.email == email).first()
    if current_user is None:
        raise credentials_exception
    return current_user

    # get_tocken =  verify_access_tocken(tocken, credentials_exception)
    # user = db.query(models.User).filter(models.User.id == get_tocken.id).first()
    # return user
