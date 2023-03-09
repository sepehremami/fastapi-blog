from pathlib import Path
from fastapi import Depends, FastAPI, APIRouter, HTTPException, Request, Response, status
from fastapi.params import Body
from schema.user import UserBase, UserOut
from typing import List
from sqlalchemy.orm import Session
from app.database import get_db
from app import models,utils
from fastapi.templating import Jinja2Templates
from schema.user import UserBase, UserUpdate, User


api_router = APIRouter()

BASE_PATH = Path(__file__).resolve().parent

templates = Jinja2Templates(directory=str(BASE_PATH / "templates"))

@api_router.get("/users")
async def get_users(request: Request , db: Session = Depends(get_db)):
    users: List[models.User] = db.query(models.User).all()
    return templates.TemplateResponse("users.html", {"request": request, "users": users})


@api_router.get("/users/{id}", response_model=UserOut)
def get_user(id : int, response : Response, db : Session = Depends(get_db)) -> dict:
    user = db.query(models.User).filter(models.User.id == id).first()
    return user


@api_router.post("/users", status_code= status.HTTP_201_CREATED, response_model=UserOut)
async def register_user(new_user: UserBase, db: Session = Depends(get_db)):
    hashed_password = utils.hash(new_user.password)
    new_user.password = hashed_password
    user = models.User(**new_user.dict())
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@api_router.delete("/users/{id}")
def delete_user(id: int, db: Session=Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id)
    if not user.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="user with id {id} does not exit"
        )
    user.delete(synchronize_session=False)
    db.commit()
    return {"data":"user deleted"}

@api_router.put("/users/{id}")
def update_user(id:int, updated_user:UserUpdate, db: Session=Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id)
    if not user.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="user with id {id} does not exit")
    user.update(updated_user.dict(), synchronize_session=False)


@api_router.patch("/users/{id}")
def update_hero(id: int, updated_user: UserUpdate,db: Session=Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = updated_user.dict(exclude_unset=True)
    for key, value in user_data.items():
        setattr(user, key, value)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
