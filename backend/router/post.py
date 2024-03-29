
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
def get_user_posts(db: Session = Depends(get_db), current_user: Users = Depends(oauth2.get_current_user),
        skip: int = 0, limit:int=10, search: Optional[str]=""):
    return post.get_multi(db, skip, limit, search)

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