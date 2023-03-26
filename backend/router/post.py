
from router import *
from crud import *


router = APIRouter(
    prefix="/posts",
    tags=["Post"]
)

@router.get("/")
def get_user_posts(db: Session = Depends(get_db), current_user: Users = Depends(oauth2.get_current_user),
        skip: int = 0, limit:int=10, search: Optional[str]=""):
    return post.get_multi(db, skip, limit, search)
    


@router.get("/{id}", status_code=200)
def get_post(id:int, db: Session = Depends(get_db),
        current_user: Users = Depends(oauth2.get_current_user)):
    result = post.get(db, id)

    if result == status.HTTP_404_NOT_FOUND:
        raise HTTPException(
            status_code = result,
            detail=f"post with id {id} does not exit"
        )

    return {'message': result}


@router.post("/", status_code= status.HTTP_201_CREATED)
def create_post(new_post: PostCreate, db: Session = Depends(get_db),
                    current_user = Depends(oauth2.get_current_user)):
    
    return post.create(new_post, db)



@router.delete("/{id}")
def delete_post(id: int, db: Session=Depends(get_db),
                current_user: Users = Depends(oauth2.get_current_user)):

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
                current_user: Users = Depends(oauth2.get_current_user)):

    result = post.update(post_id, db, post_update)
    if result == status.HTTP_404_NOT_FOUND:
        raise HTTPException(
            status_code = result,
            detail="post with id {post_id} does not exit"
        )
    return {'msg':'post updated'}