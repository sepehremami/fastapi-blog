from fastapi import APIRouter, Depends, Request, status, HTTPException, Response
from sqlalchemy.orm import Session
from schema.user import UserBase
from database.models import User
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from database.database import get_db
import oauth2
from fastapi.templating import Jinja2Templates
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from utils import verify
router = APIRouter(tags=['Authentication'])




from pathlib import Path


BASE_PATH = Path(__file__).resolve().parent
print(BASE_PATH)
router = APIRouter(tags=['Authentication'])
path = "../templates"
path_static = "../static/"
templates = Jinja2Templates(directory=str(path))

@router.get("/login")
def login(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})



@router.post('/login')
async def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db:Session = Depends(get_db)):
    user: UserBase = db.query(User).filter(User.email==user_credentials.username).first()
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

    return {"access_token":access_tocken, "tocken_type": "bearer"}


