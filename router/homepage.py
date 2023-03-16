from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.templating import Jinja2Templates
from database.database import get_db
from sqlalchemy.orm import Session
from database.models import Post

router = APIRouter(
    prefix="/home-page",
    tags=["HomePage"]
    )

template = Jinja2Templates(directory="mehdi/src")

@router.get('/')
async def home(request:Request, db: Session = Depends(get_db)):
    posts = db.query(Post).all()
    return template.TemplateResponse('home.html',{'request': request, 'posts':posts})
    # return {'msg': 'hello'}

@router.post('/')
async def search(search, request:Request, db: Session = Depends(get_db)):
    posts = db.query(Post).filter(Post.title == search).first()
    return template.TemplateResponse('home.html',{'request': request, 'posts':posts})
