from pathlib import Path
from fastapi import Depends, FastAPI, APIRouter

from app.router import auth
from app.database import Base, engine
from fastapi.templating import Jinja2Templates
from app.router import post, user


Base.metadata.create_all(bind=engine)
app = FastAPI(title="Blog")
api_router = APIRouter()
BASE_PATH = Path(__file__).resolve().parent

templates = Jinja2Templates(directory=str(BASE_PATH / "templates"))

@app.get("/", status_code=200)
def root():
    return {'message: hello'}



app.include_router(post.router, tags=["posts"])
app.include_router(user.api_router, tags=["users"])
app.include_router(auth.router)



if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")
