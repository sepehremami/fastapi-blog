from pathlib import Path
from fastapi import Depends, FastAPI, APIRouter, HTTPException, Request, Response, status
from fastapi.params import Body
from app import oauth2
from schema.post import PostBase
from schema.user import UserBase, UserOut
from typing import List
from sqlalchemy.orm import Session
from app.database import get_db
from app import models
from fastapi.templating import Jinja2Templates
from schema.user import UserBase, UserUpdate, User
from app import utils
from app import oauth2

router = APIRouter(
    prefix="/posts"   
)

@router.get("/", status_code=200)
def get_all_posts():
    return {'message: post'}


@router.get("/{id}", status_code=200)
def get_post():
    return {'message: post'}

@router.post("/", status_code= status.HTTP_201_CREATED)
async def create_post(new_post: PostBase,request: Request, db: Session = Depends(get_db), user_id: str= Depends(oauth2.get_current_user)):
   
    print(request.user)
    post = models.Post(**new_post.dict())
    db.add(post)
    db.commit()
    db.refresh(post)
    return post