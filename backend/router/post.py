
from fastapi import Query
from schema.post import PostOut
from router import *
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


@router.get("/search", response_model=List[PostOut], status_code=status.HTTP_200_OK)
def search_all_posts(
        db: Session = Depends(get_db), 
        skip: int = 0,
        limit:int=10,
        search: Optional[str]=""):
    print(search.lower())
    posts: List[Post] = db.query(Post).\
        filter(Post.title.ilike(f"%{search}%"), Post.description.ilike(f'%{search}%')).\
        limit(limit).offset(skip).all()
    
    return posts


@router.get("/", response_model=List[PostOut], status_code=status.HTTP_200_OK)
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
    
    return posts


@router.get("/{id}", response_model=PostOut, status_code=200)
def get_post(
        id:int,
        db: Session = Depends(get_db),
        current_user: User = Depends(oauth2.get_current_user)):
    
    post = db.query(Post).filter(Post.id==id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"post with id {id} does not exit"
        )
    if post.user_id != current_user.id:
         raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Operation not permitted"
        )
    
    return post


@router.post("/", status_code= status.HTTP_201_CREATED)
async def create_post(new_post: PostCreate,
                    db: Session = Depends(get_db),
                    current_user = Depends(oauth2.get_current_user)):
    post_information = new_post.dict()
    post_information.update({"user_id":current_user.id})
    post = Post(**post_information)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.delete("/{id}")
def delete_post(id: int, db: Session=Depends(get_db),
                current_user: User = Depends(oauth2.get_current_user)):
    post = db.query(Post).filter(Post.id == id)
    if not post.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"post with id {id} does not exit"
        )
    if post.first().user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Operation not permitted"
        )
    post.delete(synchronize_session=False)
    db.commit()
    return {"data":"post deleted",
            "deleted post": post.first()}



@router.put('/{post_id}')
async def update_post(post_update: PostCreate, post_id:int, db: Session = Depends(get_db),
                current_user: User = Depends(oauth2.get_current_user)):
    post = db.query(Post).filter(Post.id == post_id)
    if not post.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="post with id {post_id} does not exit"
        )
    post.update(post_update.dict(), synchronize_session=False)
    db.commit()
    return {'msg':'post updated'}