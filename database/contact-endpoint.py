from fastapi import Depends, APIRouter, HTTPException, Request, Response, status
from fastapi.templating import Jinja2Templates

router= APIRouter()
templates = Jinja2Templates(directory="templates")

@router.get("/contact")
def contact(request: Request):
    return templates.TemplateResponse("contact.html", {"request": request})

@router.get("/about-us")
def about(request: Request):
    return templates.TemplateResponse("about.html", {"request": request})
