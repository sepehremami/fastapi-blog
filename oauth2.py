from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from database import models
from database.database import get_db
import schema
from sqlalchemy.orm import Session
from config import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORYTHM, SECRET_KEY
from schema.tocken import TockenData


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

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
            raise credentials_exception
        tocken_data = TockenData(id=id)
    except JWTError:
        raise credentials_exception
    return tocken_data
    

def get_current_user(tocken = Depends(oauth2_scheme),
                    db:Session = Depends(get_db)):
    print(type(tocken))
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="could not validate credentials",
        headers={"WWW-Authenticate":"Bearer"})
    
    get_tocken = verify_access_tocken(tocken, credentials_exception)
    print(get_tocken)
    user = db.query(models.User).filter(models.User.id == get_tocken.id).first()
    return user