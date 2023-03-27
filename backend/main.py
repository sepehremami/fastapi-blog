from fastapi import FastAPI 
from database import Base, engine
from router import routers
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from config import settings


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routers.router)


if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")
