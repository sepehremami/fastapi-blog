
import base64
from fastapi.responses import StreamingResponse
from io import BytesIO
from fastapi import UploadFile, File
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


@router.get("/mypost")
async def get_users(request: Request , db: Session = Depends(get_db)):
    users: List[UserBase] = db.query(User).all()

    return templates.TemplateResponse("myPosts.html", {"request": request, "users": users})


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

@router.post("/user/image/{user_id}")
async def upload_image(user_id: int ,db :Session = Depends(get_db), file: UploadFile = File(...)):
    # Create a SQLAlchemy db
    file_content = await file.read()
    # Update the corresponding user object with the binary data
    image = Image(image=file_content, user_id=user_id)
    image.user_id = user_id
    db.add(image)
    db.commit()
    db.close()
    # Return the updated user profile
    return image

@router.get('/user/image')
async def get_images(db: Session = Depends(get_db)):
    images = db.query(Image).all()

    return images


@router.get("/images/")
def get_image(db:Session= Depends(get_db)):
    # Get the row containing the image data
    image_row = db.query(Image).first()
    print(image_row)
    if image_row is not None:
        # Access the LargeBinary column containing the image data
        image_data = image_row.image
        print(type(image_data))
        # Convert the LargeBinary data to a Pillow Image
        image = ImagePillow.open(BytesIO(image_data))
        
        # Save the image to a BytesIO object
        buffer = BytesIO()
      
        image.save(buffer, format="JPEG")

        # Return the image in the response
        return StreamingResponse(buffer, media_type="image/jpeg")
    else:
        raise HTTPException(status_code=404, detail="Image not found")
    
@router.get('/image/view')
async def view_image(response: Response, db:Session=Depends(get_db)):
    # Query image data from database
    
    image = db.query(Image).first()
    

    # Convert binary data to PIL Image
    img = ImagePillow.open(BytesIO(image.image))
    # Create BytesIO buffer to hold JPEG data
    buffer = BytesIO()
    img.save(buffer, format='JPEG')

    base64_encoded_image = base64.b64encode(image.image).decode("utf-8")
    # Return JPEG data as StreamingResponse
    # stream = StreamingResponse(iter([buffer.getvalue()]), media_type='image/jpeg')
    # print(stream)
    return base64_encoded_image