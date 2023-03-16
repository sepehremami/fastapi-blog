from fastapi import APIRouter, Depends, status, HTTPException, Response
from sqlalchemy.orm import Session
from schema.user import UserBase
from database.models import User
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from database.database import get_db
import oauth2
from datetime import timedelta
from utils import verify, hash , get_user 
router = APIRouter(tags=['Authentication'])

ACCESS_TOKEN_EXPIRE_MINUTES = 30

@router.post('/login')
async def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db:Session = Depends(get_db)):
    user: UserBase = db.query(User).filter(User.email==user_credentials.username).first()
    print(user.id)
    print()
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

    return {"access_tocken":access_tocken, "tocken_type": "bearer"}

@router.post("/register")
def register(
    *,
    db: Session = Depends(get_db),
    username: str,
    email: str,
    password: str,
    phone: str = None,
    image: str = None
):
    
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

@router.get("/home-page")
def landing():
    return {'msg' : 'home page'}

@router.get("/sign-in")
def sign_in(): 
    return {'msg': 'sign-in page'}

@router.get("/sign-up")
def sign_up():
    return {'msg' : 'sign-up page'}


@router.get("/about-us")
def about():
    return {'msg':'about us page'}

@router.get("/contact")
def contact():
    return {'msg':'contact page'}
