from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy_utils import database_exists, create_database
from config import settings
from sqlalchemy.sql import func

SQLALCHEMY_DATABASE_URL = f"postgresql://{settings.database_username}@{settings.database_hostname}/{settings.database_name}"


engine = create_engine(SQLALCHEMY_DATABASE_URL)

if not database_exists(engine.url):
    create_database(engine.url)


sqlsession = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = sqlsession()
    try:
        yield db
    finally:
        db.close()


