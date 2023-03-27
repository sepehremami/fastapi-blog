from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi import status

from database import Base, Users, Post, Comment, Category, User

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model

    def get(self, db: Session, id: int):
        obj = db.query(self.model).filter(self.model.id == id).first()  #user_id
        if not obj:
            return status.HTTP_404_NOT_FOUND
        return obj
    

    def get_multi(self, db: Session, skip: int = 0, limit: int = 150, search: Optional[str]=""):
        return db.query(self.model).all()
        

    def create(self, obj_in: CreateSchemaType, db: Session):
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj



    def update(self, id:int, db: Session, db_obj: ModelType):
        obj = db.query(self.model).filter(self.model.id == id)
        if not obj:
            return status.HTTP_404_NOT_FOUND

        obj.update(db_obj.dict(), synchronize_session=False)
        db.commit()
        return status.HTTP_200_OK



    def remove(self, db: Session, id: int):
        obj = db.query(self.model).filter(self.model.id == id)
        if not obj.first():
            return status.HTTP_404_NOT_FOUND
        
        obj.delete(synchronize_session=False)
        db.commit()
        # db.refresh()  
        return status.HTTP_200_OK
    

users = CRUDBase(User)
post = CRUDBase(Post)
comment = CRUDBase(Comment)
category = CRUDBase(Category)
