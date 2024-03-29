from router import *

router = APIRouter(
    prefix="/home-page",
    tags=["HomePage"]
    )
BASE_PATH = Path(__file__).resolve().parent.parent

path = f"{BASE_PATH}/templates"
template = Jinja2Templates(directory=path)

@router.get('/')
async def home(request:Request, db: Session = Depends(get_db)):
    posts = db.query(Post).all()
    return template.TemplateResponse('home.html',{'request': request, 'posts':posts})
 
@router.post('/search')
async def search(search, request:Request, db: Session = Depends(get_db)):
    posts = db.query(Post).filter(Post.title == search).first()
    return template.TemplateResponse('home.html',{'request': request, 'posts':posts})


@router.get("/contact")
def contact(request: Request):
    return template.TemplateResponse("contact.html", {"request": request})


@router.get("/about-us")
def about(request: Request):
    return template.TemplateResponse("about.html", {"request": request})
