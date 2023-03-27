
import base64
from fastapi.responses import StreamingResponse
from io import BytesIO
from fastapi import UploadFile, File
from backend.oauth2 import get_current_user
from database.models import Image
from router import *
import utils
from PIL import Image as ImagePillow


router = APIRouter(
    tags=['Users']
)


@router.get("/users")
async def get_users(request: Request , db: Session = Depends(get_db)):
    users: List[UserBase] = db.query(User).all()
    return users


@router.get("/users/{id}")
def get_user(id : int, response : Response, db : Session = Depends(get_db)) -> dict:
    user = db.query(User).filter(User.id == id).first()
    return user


@router.post("/users", status_code= status.HTTP_201_CREATED)
async def create_user(new_user: UserCreate, db: Session = Depends(get_db)):
    hashed_password = utils.hash(new_user.password)
    new_user.password = hashed_password
    user = User(**new_user.dict())
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.delete("/users/{id}")
def delete_user(id: int, db: Session=Depends(get_db)):
    user = db.query(User).filter(User.id == id)
    if not user.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="user with id {id} does not exit"
        )
    user.delete(synchronize_session=False)
    db.commit()
    return {"data":"user deleted"}

@router.put("/users/{id}")
def update_user(id:int, updated_user:UserBase, db: Session=Depends(get_db)):
    user = db.query(User).filter(User.id == id)
    if not user.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="user with id {id} does not exit")
    user.update(updated_user.dict(), synchronize_session=False)


@router.patch("/users/{id}")
def update_hero(id: int, updated_user: UserBase,db: Session=Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()
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
