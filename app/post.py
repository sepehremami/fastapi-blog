from fastapi import FastAPI, Request, Form
from schema.post_schema import Post


app = FastAPI()





@app.get('/posts')
def show_posts():
    return {'msg': 'post page with all post'}

@app.get("/posts/")
def show_posts(post_id:int):
    return {'msg':f'one post whit this id: {post_id}'}