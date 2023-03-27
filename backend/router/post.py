
from fastapi import Query
from schema.post import PostOut
from router import *
from crud import *
from sqlalchemy import func


router = APIRouter(
    prefix="/posts",
    tags=["Post"]
)

@router.get("/")
def get_user_posts(
        db: Session = Depends(get_db), 
        current_user: User = Depends(oauth2.get_current_user),
        skip: int = 0,
        limit:int=10,
        search: Optional[str]=""):

    posts: List[Post] = db.query(Post).\
        filter(Post.user_id==current_user.id).\
        filter(Post.title.contains(search)).\
        limit(limit).offset(skip).all()
    


@router.get("/{id}", status_code=200)
def get_post(
        id:int,
        db: Session = Depends(get_db),
        current_user: User = Depends(oauth2.get_current_user)):
    
    post = db.query(Post).filter(Post.id==id).first()
    if not post:
        raise HTTPException(
            status_code = result,
            detail=f"post with id {id} does not exit"
        )
    if post.user_id != current_user.id:
         raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Operation not permitted"
        )
    return {'message': post}


@router.post("/", status_code= status.HTTP_201_CREATED)
def create_post(new_post: PostCreate, db: Session = Depends(get_db),
                    current_user = Depends(oauth2.get_current_user)):
    
    return post.create(new_post, db)



@router.delete("/{id}")
def delete_post(id: int, db: Session=Depends(get_db),
                current_user = Depends(oauth2.get_current_user)):

    result = post.remove(db, id)
    if result == status.HTTP_404_NOT_FOUND:
        raise HTTPException(
            status_code = result,
            detail=f"post with id {id} does not exit"
        )

    return {"data":"post deleted",
            "deleted post": id}



@router.put('/{post_id}')
async def update_post(post_update: PostCreate, post_id:int, db: Session = Depends(get_db),
                current_user = Depends(oauth2.get_current_user)):

    result = post.update(post_id, db, post_update)
    if result == status.HTTP_404_NOT_FOUND:
        raise HTTPException(
            status_code = result,
            detail="post with id {post_id} does not exit"
        )
    return {'msg':'post updated'}