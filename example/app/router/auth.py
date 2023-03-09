from fastapi import APIRouter, Depends, status, HTTPException, Response
from sqlalchemy.orm import Session
from .. import models, oauth2
from schema.user import UserLogin
from ..database import get_db
from ..utils import verify
from fastapi.security.oauth2 import OAuth2PasswordRequestForm


router = APIRouter(tags=['Authentication'])


@router.post('/login')
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db:Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email==user_credentials.username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid Credentials"
        )
    if not verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid Credentials"
        )
    access_tocken = oauth2.create_access_tocken(data={"user_id": user.id})
    # create a tocken 
    # return tocken
    return {"access_tocken":access_tocken, "tocken_type": "bearer"}

# sepehr7890
# # password : ]v~ehau5i`qdH_8,*;A$-mKie=E/Wc{'Idk#d,qCZKZ5]pl
#   "username": "sepehr7890",
#   "email": "user@example.com",
#   "created_at": "2023-03-06T17:56:08.008764",
#   "password": "?9](|0<5Mh`V'il N`!DU"
# {
#   "username": "sepehr90",
#   "email": "sepehr90@example.com",
#   "created_at": "2023-03-07T00:34:57.682815+03:30"
# }
	
# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNywiZXhwIjoxNjc4MTM4NzY3fQ.breYEtC_vPFn39i-Zp5nnl12S8bKjTKr5tZJ0AEkohY