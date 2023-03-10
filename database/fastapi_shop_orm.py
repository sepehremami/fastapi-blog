from sqlalchemy import create_engine,Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.sql import func
from datetime import datetime

engine = create_engine("postgresql://postgres:None@localhost/mydatabase")#postgrese khodet
sqlsession = sessionmaker(bind=engine)
Base = declarative_base()

def get_db():
    db = sqlsession()
    try:
        yield db
    finally:
        db.close()

# User Model
class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    image = Column(String)
    password = Column(String)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow())

    # Relationship with Post and Comment models
    posts = relationship("Post", back_populates="user")
    comments = relationship("Comment", back_populates="user")

# Post Model
class Post(Base):
    __tablename__ = 'post'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow())

    # Foreign Keys
    user_id = Column(Integer, ForeignKey('user.id'))
    category_id = Column(Integer, ForeignKey('category.id'))

    # Relationship with User and Comment models
    user = relationship("User", back_populates="posts")
    category = relationship("Category", back_populates="posts")
    comments = relationship("Comment", back_populates="post")

# Category Model
class Category(Base):
    __tablename__ = 'category'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

    # Relationship with Post models
    posts = relationship("Post", back_populates="category")

# Comment Model
class Comment(Base):
    __tablename__ = 'comment'

    id = Column(Integer, primary_key=True, index=True)
    parent_id = Column(Integer, default=None)
    description = Column(String)
    confirmed = Column(Boolean, default=False)

    # Foreign Keys
    user_id = Column(Integer, ForeignKey('user.id'))
    post_id = Column(Integer, ForeignKey('post.id'))

    # Relationship with User and Post models
    user = relationship("User", back_populates="comments")
    post = relationship("Post", back_populates="comments")

Base.metadata.create_all(bind=engine)
