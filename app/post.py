from fastapi import FastAPI, Request, APIRouter, Depends
from ..schema.post_schema import Posts
from ..database.fastapi_shop_orm import Post, get_db
from sqlalchemy.orm import Session

router = APIRouter()






@router.get('/posts')
async def show_posts(db: Session = Depends(get_db)):
    posts = db.query(Post).all()
    return {'post': posts}

@router.get("/posts/")
async def show_posts(post_id:int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    return {'msg': post}

@router.post('/add-post')
async def add_post(new_post: Posts, db: Session = Depends(get_db)):
    post = Post(**new_post.dict())
    db.add(post)
    db.commit()
    db.refresh(post)
    return {'msg': 'post added successful'}