from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from app.database import get_db
import schema
from sqlalchemy.orm import Session

# Secret Key
# Algorythem 
# Expiration
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
SECRET_KEY = "819975e4d4ca06ef5985720d388283611c43830e9e7e7c297aea9f6a504096f3"
ALGORYTHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_access_tocken(data:dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORYTHM)
    return encoded_jwt


def verify_access_tocken(tocken:str, credentials_exception):
    try:
        payload = jwt.decode(tocken, SECRET_KEY, algorithms=[ALGORYTHM])
        id :str = payload.get("user_id")
        if id is None:
            raise ZeroDivisionError
        tocken_data = schema.TockenData(id=id)
        return tocken_data
    except JWTError:
        print("something went wrong")

    

def get_current_user(tocken:str = Depends(oauth2_scheme), db:Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="could not validate credentials",
        headers={"WWW-Authenticate":"Bearer"})
    return verify_access_tocken(tocken, credentials_exception)