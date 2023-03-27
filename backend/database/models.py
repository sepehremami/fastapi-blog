
from sqlalchemy import Boolean, LargeBinary, create_engine, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from database.base_class import Base
from datetime import datetime
from sqlalchemy import func

class Users(Base):
    
    id = Column(Integer, primary_key=True)
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


class Post(Base):

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow())

    # Relationship with User and Comment models
    user = relationship("Users", back_populates="posts")
    category = relationship("Category", back_populates="posts")
    comments = relationship("Comment", back_populates="posts")

  #  Foreign Keys
    user_id = Column(Integer, ForeignKey('users.id'))
    category_id = Column(Integer, ForeignKey('category.id'))

    @classmethod
    def get_random_posts(cls, num_posts, session):
        return session.query(cls).order_by(func.random()).limit(num_posts).all()
    
    @classmethod
    def get_latest_posts(cls, num_posts, session):
        return session.query(cls).order_by(cls.created_at.desc()).limit(num_posts).all()




class Category(Base):

    id = Column(Integer, primary_key=True)
    name = Column(String)

    # Relationship with Post models
    posts = relationship("Post", back_populates="category")



class Comment(Base):

    id = Column(Integer, primary_key=True)
    parent_id = Column(Integer, default=None)
    description = Column(String)
    confirmed = Column(Boolean, default=False)

    # Foreign Keys
    user_id = Column(Integer, ForeignKey('users.id'))
    post_id = Column(Integer, ForeignKey('post.id'))

    # Relationship with User and Post models
    user = relationship("Users", back_populates="comments")
    posts = relationship("Post", back_populates="comments")


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
   
    password = Column(String)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow())




class Image(Base):
    __tablename__ = "images"
    id = Column(Integer, primary_key=True)
    image = Column(LargeBinary, nullable=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    post_id = Column(Integer, ForeignKey('post.id'))