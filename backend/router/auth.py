from schema.user import UserOut
from router import *
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from utils import verify, hash
from schema.user import UserModel
from database.models import User


router = APIRouter(tags=['Authentication'])


@router.post('/auth/login/')
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db:Session = Depends(get_db)):
    # print(user_credentials.username, user_credentials.password)
    user = db.query(User).filter(User.email == user_credentials.username).first()


    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid Credentials"
        )
    if not verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid Credentials"
        )
    access_tocken = oauth2.create_access_tocken(data={"user_id": user.id})

    return {"access_token":access_tocken, "token_type": "bearer"}


@router.post("/auth/register")
def register(user: UserModel, db: Session = Depends(get_db)):

    if db.query(User).filter(User.username == user.username).first():

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already taken"
        )

    if db.query(User).filter(User.email == user.email).first():

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )

    hashed_password = hash(user.password)
    new_user = User(
        username=user.username,
        email=user.email,
        phone=user.phone,
        password=hashed_password
    )
    db.add(new_user)
    db.commit()
    access_token = oauth2.create_access_tocken(data={"user_id": new_user.id})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/auth/me/", response_model=UserOut)
def get_login_user(
    request: Request,
    current_user = Depends(oauth2.get_current_user)):
    return current_user

    