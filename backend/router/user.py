
from router import *
import utils
from crud import *



router = APIRouter(
    tags=['Users']
)


@router.get("/users")
def get_users(request: Request , db: Session = Depends(get_db)):
     return users.get_multi(db)


@router.get("/users/{id}") 
def get_user(id : int, db : Session = Depends(get_db)):
    result = users.get(db, id)
    if result == status.HTTP_404_NOT_FOUND:
        raise HTTPException(
            status_code = result,
            detail=f"user with id {id} does not exit"
        )
    return {'message': result}

async def get_users(request: Request , db: Session = Depends(get_db)):
    users: List[UserBase] = db.query(User).all()
    return users


@router.get("/users/{id}")
def get_user(id : int, response : Response, db : Session = Depends(get_db)) -> dict:
    user = db.query(User).filter(User.id == id).first()
    return user



@router.post("/users", status_code= status.HTTP_201_CREATED)
def create_user(new_user: UserCreate, db: Session = Depends(get_db)):

    hashed_password = utils.hash(new_user.password)
    new_user.password = hashed_password
    return users.create(new_user, db)



@router.delete("/users/{id}")
def delete_user(id: int, db: Session=Depends(get_db)):
    result = users.remove(db, id)
    if result == status.HTTP_404_NOT_FOUND:
        raise HTTPException(
            status_code = result,
            detail=f"user with id {id} does not exit"
        )

    return {"data":"user deleted"}

@router.put("/users/{id}")
def update_user(id:int, updated_user:UserBase, db: Session=Depends(get_db)):
    result = users.update(id, db, updated_user)
    if result == status.HTTP_404_NOT_FOUND:
        raise HTTPException(
            status_code = result,
            detail=f"user with id {id} does not exit")
    
    return {'msg':'user updated'}


@router.patch("/users/{id}")
def update_hero(id: int, updated_user: UserBase,db: Session=Depends(get_db)):
    user = db.query(Users).filter(Users.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = updated_user.dict(exclude_unset=True)
    for key, value in user_data.items():
        setattr(user, key, value)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.get('/image/view')
async def view_image(response: Response, db:Session=Depends(get_db), current_user=Depends(get_current_user)):
    image = db.query(Image).filter(Image.user_id==current_user.id).first()
    img = ImagePillow.open(BytesIO(image.image))
    buffer = BytesIO()
    img.save(buffer, format='JPEG')
    base64_encoded_image = base64.b64encode(image.image).decode("utf-8")
    return base64_encoded_image


@router.post("/user/image/")
async def upload_image(user_id: int ,db :Session = Depends(get_db), file: UploadFile = File(...), current_user=Depends(get_current_user)):
    file_content = await file.read()
    image = Image(image=file_content, user_id=current_user.id)
    db.add(image)
    db.commit()
    db.close()
    return image
