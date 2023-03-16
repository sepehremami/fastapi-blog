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
import os
# os.system("pwd")
router = APIRouter(tags=['Authentication'])


from pathlib import Path


BASE_PATH = Path(__file__).resolve().parent.parent
print(BASE_PATH)
router = APIRouter(tags=['Authentication'])

path = f"{BASE_PATH}/templates"

path_static = f"{BASE_PATH}/static/"

templates = Jinja2Templates(directory=path)


@router.get("/login")
def login(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})


@router.post('/login')
async def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db:Session = Depends(get_db)):
    user = db.query(User).filter(User.email==user_credentials.username).first()
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


@router.get("/me")
def get_login_user(
    request: Request,
    current_user = Depends(oauth2.get_current_user)):
    return templates.TemplateResponse('profile.html', {"request": request})


@router.post("/register")
def register(
        *,
        db: Session = Depends(get_db),
        username: str,
        email: str,
        password: str,
        phone: str = None,
        image: str = None):
    
    if db.query(User).filter(User.username == username).first():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already taken"
        )
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )

    
    hashed_password = utils.hash(password)
    new_user = User(
        username=username,
        email=email,
        phone=phone,
        image=image,
        password=hashed_password
    )

    
    db.add(new_user)
    db.commit()

    
    access_token = oauth2.create_access_tocken(data={"user_id": new_user.id})
    return {"access_token": access_token, "token_type": "bearer"}
