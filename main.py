from fastapi import FastAPI, Request, Form 
from database.database import Base,engine
from router import routers

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/", status_code=200)
def root():
    return {'message: hello'}

app.include_router(routers.router)


if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")
