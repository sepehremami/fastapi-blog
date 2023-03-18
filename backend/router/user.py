from pathlib import Path
from fastapi import Depends, APIRouter, HTTPException, Request, Response, status
from typing import List
from sqlalchemy.orm import Session
from database.database import get_db
from database.models import User 
import utils
from fastapi.templating import Jinja2Templates
from schema.user import UserBase, UserCreate


router = APIRouter(
    tags=['Users']
)

BASE_PATH = Path(__file__).resolve().parent.parent

path = f"{BASE_PATH}/templates"
templates = Jinja2Templates(directory=path)

@router.get("/users")
async def get_users(request: Request , db: Session = Depends(get_db)):
    users: List[UserBase] = db.query(User).all()
    return users


@router.get("/mypost")
async def get_users(request: Request , db: Session = Depends(get_db)):
    users: List[UserBase] = db.query(User).all()

    return templates.TemplateResponse("myPosts.html", {"request": request, "users": users})


@router.get("/users/{id}")
def get_user(id : int, response : Response, db : Session = Depends(get_db)) -> dict:
    user = db.query(User).filter(User.id == id).first()
    return user


@router.post("/users", status_code= status.HTTP_201_CREATED)
async def create_user(new_user: UserCreate, db: Session = Depends(get_db)):
    hashed_password = utils.hash(new_user.password)
    new_user.password = hashed_password
    user = User(**new_user.dict())
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.delete("/users/{id}")
def delete_user(id: int, db: Session=Depends(get_db)):
    user = db.query(User).filter(User.id == id)
    if not user.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="user with id {id} does not exit"
        )
    user.delete(synchronize_session=False)
    db.commit()
    return {"data":"user deleted"}

@router.put("/users/{id}")
def update_user(id:int, updated_user:UserBase, db: Session=Depends(get_db)):
    user = db.query(User).filter(User.id == id)
    if not user.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="user with id {id} does not exit")
    user.update(updated_user.dict(), synchronize_session=False)


@router.patch("/users/{id}")
def update_hero(id: int, updated_user: UserBase,db: Session=Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = updated_user.dict(exclude_unset=True)
    for key, value in user_data.items():
        setattr(user, key, value)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
