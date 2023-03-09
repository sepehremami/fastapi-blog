from sqlalchemy import create_engine 
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy_utils import database_exists, create_database

SQLALCHEMY_DATABASE_URI = "postgresql://postgres@localhost/fastapi_exer.db"

engine = create_engine(SQLALCHEMY_DATABASE_URI)
print(engine.url)
if not database_exists(engine.url):
    create_database(engine.url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False ,bind=engine)

Base = declarative_base()

# we have to do this dependecy every time
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()