
from fastapi import Query
from oauth2 import get_current_user
from schema.post import PostForPage, PostOut
from router import *
from crud import *
from sqlalchemy import func


router = APIRouter(
    prefix="/posts",
    tags=["Post"]
)


@router.get("/random/", response_model=List[PostOut])
def get_random_posts(num_posts: int = Query(default=10, leq=10), db: Session = Depends(get_db)):
    random_posts = Post.get_random_posts(num_posts=num_posts, session=db)
    return random_posts


@router.get("/latest/", response_model=List[PostOut])
def get_random_posts(num_posts: int = Query(default=10, leq=10), db: Session = Depends(get_db)):
    latest_posts = Post.get_latest_posts(num_posts=num_posts, session=db)
    return latest_posts



@router.get("/")
def get_all_posts(
        db: Session = Depends(get_db), 

        skip: int = 0,
        limit:int=10,
        search: Optional[str]=""):

    posts: List[Post] = db.query(Post).\
        filter(Post.title.contains(search)).\
        limit(limit).offset(skip).all()
    return posts



@router.get("/my-post")
def get_user_posts(
        db: Session = Depends(get_db), 
        current_user = Depends(get_current_user),
        skip: int = 0,
        limit:int=10,
        search: Optional[str]=""):

    posts: List[Post] = db.query(Post).\
        filter(Post.user_id == current_user.id).\
        filter(Post.title.contains(search)).\
        limit(limit).offset(skip).all()
    return posts


@router.get("/{id}", response_model=PostForPage, status_code=status.HTTP_200_OK)
def get_post(
        id:int,
        db: Session = Depends(get_db),
        current_user: User = Depends(oauth2.get_current_user)):
    
    post = db.query(Post).filter(Post.id==id).first()
    if not post:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail=f"post with id {id} does not exit"
        )
    if post.user_id != current_user.id:
         raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Operation not permitted"
        )
    return post


@router.post("/", status_code= status.HTTP_201_CREATED)
def create_post(new_post: PostCreate, db: Session = Depends(get_db),
                    current_user = Depends(oauth2.get_current_user)):
    
    return post_create.create(new_post, db, current_user.id)



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