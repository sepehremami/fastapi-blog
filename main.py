from fastapi import FastAPI, Request, Form
from schema.user_schema import User
from schema.post_schema import Post
from schema.category_schema import Category
from schema.comment_schema import Comment



app = FastAPI()

@app.get("/home-page")
def landing():
    return {'msg' : 'home page'}

@app.get("/sign-in")
def sign_in(): 
    return {'msg': 'sign-in page'}

@app.get("/sign-up")
def sign_up():
    return {'msg' : 'sign-up page'}

@app.get('/posts')
def show_posts():
    return {'msg': 'post page with all post'}

@app.get("/posts/")
def show_posts(post_id:int):
    return {'msg':f'one post whit this id: {post_id}'}

@app.get("/about-us")
def about():
    return {'msg':'about us page'}

@app.get("/contact")
def contact():
    return {'msg':'contact page'}


