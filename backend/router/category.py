from router import *
from crud import *

router = APIRouter(
    prefix="/category",
    tags=["Category"]
)

@router.get("/")
def show_categories(db: Session = Depends(get_db)):
    return category.get_multi(db)


@router.get("/{id}", status_code=status.HTTP_200_OK)
def show_category(id:int, db: Session = Depends(get_db)):
    result = category.get(db, id)
    if result == status.HTTP_404_NOT_FOUND:
        raise HTTPException(
            status_code = result,
            detail="category with id {id} does not exit"
        )
    return {'message': result}


@router.post("/")
def add_category(new_category:CategoryBase, db: Session = Depends(get_db)):
    return category.create(new_category, db)


@router.delete("/{id}")
def delete_category(id: int, db: Session=Depends(get_db)):
    result = category.remove(db, id)
    if result == status.HTTP_404_NOT_FOUND:
        raise HTTPException(
            status_code = result,
            detail="category with id {id} does not exit"
        )
    return {"data":"category deleted"}


@router.put("/{id}")
def update_category(id:int, updated_category:CategoryBase, db: Session=Depends(get_db)):
    result = category.update(id, db, Category)
    if result == status.HTTP_404_NOT_FOUND:
        raise HTTPException(
            status_code = result,
            detail="category with id {id} does not exit"
        )
    return {'msg':'category updated'}