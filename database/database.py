from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy_utils import database_exists, create_database

from sqlalchemy.sql import func
from datetime import datetime

SQLALCHEMY_DATABASE_URL= "postgresql://postgres@localhost/fastapi-blog"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
if not database_exists(engine.url):
    create_database(engine.url)
sqlsession = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db=sqlsession()
    try:
        yield db
    finally:
        db.close()


