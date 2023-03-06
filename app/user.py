from fastapi import FastAPI, Request, Form
from schema.user_schema import User



app = FastAPI()



@app.get("/sign-in")
def sign_in(): 
    return {'msg': 'sign-in page'}

@app.get("/sign-up")
def sign_up():
    return {'msg' : 'sign-up page'}