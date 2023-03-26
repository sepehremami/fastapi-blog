from router import *
from crud import *


router = APIRouter(prefix="/comment", tags=["Comment"])

@router.get("/", response_model= List[CommentBase])
def get_user_comments(
        db :Session = Depends(get_db),
        current_user : Users =  Depends(oauth2.get_current_user),
        skip: int = 0,
        limit: int = 10
        ):
    return comment.get_multi(db, skip, limit)
    


@router.get("/{id}", status_code=status.HTTP_200_OK)
def get_comment(
        id : int,
        db: Session = Depends(get_db),
        current_user: Users = Depends(oauth2.get_current_user)):
    
    result = comment.get(db, id)
    
    if result == status.HTTP_404_NOT_FOUND:
        raise HTTPException(
            status_code = result,
            detail=f"comment with id {id} does not exit"
        )
    return {'message': result}


@router.post("/", status_code= status.HTTP_201_CREATED)
def create_comment(new_comment : CommentBase, 
                   db :Session = Depends(get_db),
                   current_user : Users = Depends(oauth2.get_current_user)):
    
    return comment.create(new_comment, db)


@router.delete("/{id}")
def delete_comment(id: int, db: Session = Depends(get_db),
                   current_user : Users = Depends(oauth2.get_current_user)):

    result = comment.remove(db, id)
    if result == status.HTTP_404_NOT_FOUND:
        raise HTTPException(
            status_code = result,
            detail=f"comment with id {id} does not exit"
        )

    return {"data":"comment deleted",
            "deleted comment": id}
