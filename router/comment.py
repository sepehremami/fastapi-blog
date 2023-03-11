from fastapi import APIRouter, Depends, HTTPException, status
import oauth2
from database.database import get_db
from sqlalchemy.orm import Session
from database.models import User 
from typing import List
from schema.comment import CommentBase, CommentOauth

router = APIRouter(prefix="/comment", tags=["Comment"])


@router.get("/", response_model= List[CommentBase])
def get_user_comments(
        db :Session = Depends(get_db),
        current_user : User =  Depends(oauth2.get_current_user),
        skip: int = 0,
        limit: int = 10
        ):
    comment = db.query(CommentBase).filter(CommentBase.user_id==current_user.id).limit(limit).offset(skip).all()
    return comment



@router.get("/{id}", status_code=status.HTTP_200_OK)
def get_comment(
        id : int,
        db: Session = Depends(get_db),
        current_user: User = Depends(oauth2.get_current_user)):
    comment = db.query(CommentBase).filter(CommentBase.user_id==id).first()
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"comment with id {id} does not exit"
        )
    if comment.user_id != current_user.id:
         raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Operation not permitted"
        )
    return {'message': comment}

@router.post("/", status_code= status.HTTP_201_CREATED)
def create_comment(new_comment : CommentOauth, 
                   db :Session = Depends(get_db),
                   current_user : User = Depends(oauth2.get_current_user)):
    comment_information = new_comment.dict()
    comment_information.update({"user_id":current_user.id})
    comment = comment(**comment_information)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment


@router.delete("/{id}")
def delete_comment(id: int, db: Session = Depends(get_db),
                   current_user : User = Depends(oauth2.get_current_user)):
    comment = db.query(CommentBase).filter(CommentBase.id == id)
    if not comment.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="comment with id {post_id} does not exit"
        )
    if comment.first().user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Operation not permitted"
        )
    comment.delete(synchronize_session=False)
    db.commit()
    return {"data":"comment deleted",
            "deleted comment": comment.first()}
