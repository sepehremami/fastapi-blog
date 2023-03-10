from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database.database import get_db
from database.models import Category
from typing import List
from schema import category


router = APIRouter(
    prefix="/category",
    tags=["Category"]
)

@router.get("/")
async def show_categories(db: Session = Depends(get_db)):
    categories: List[category.Category] = db.query(Category).all()
    return categories

@router.get("/{id}")
async def show_category(id:int, db: Session = Depends(get_db)):
    cat: category.Category = db.query(Category).filter(Category.id == id).first()
    return cat

@router.post("/")
async def add_category(new_category:category.Category, db: Session = Depends(get_db)):
    cat = Category(**new_category.dict())
    db.add(cat)
    db.commit()
    db.refresh(cat)
    return cat

@router.delete("/{id}")
async def delete_category(id: int, db: Session=Depends(get_db)):
    category = db.query(Category).filter(Category.id == id)
    if not category.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="category with id {id} does not exit"
        )
    category.delete(synchronize_session=False)
    db.commit()
    return {"data":"category deleted"}

@router.put("/{id}")
async def update_category(id:int, updated_category:category.Category, db: Session=Depends(get_db)):
    category = db.query(Category).filter(Category.id == id)
    if not category.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="user with id {id} does not exit")
    category.update(updated_category.dict(), synchronize_session=False)