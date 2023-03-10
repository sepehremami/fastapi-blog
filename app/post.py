from fastapi import FastAPI, Request, APIRouter
from schema.post_schema import Post


router = APIRouter()






@router.get('/posts')
def show_posts():
    return {'msg': 'post page with all post'}

@router.get("/posts/")
def show_posts(post_id:int):
    return {'msg':f'one post whit this id: {post_id}'}

@router.post('/add-post')
def add_post(post=Post):
