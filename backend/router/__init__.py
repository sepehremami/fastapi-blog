from fastapi import Depends, APIRouter, HTTPException, Request, Response, status
from sqlalchemy.orm import Session
from database import User, get_db, Category, Comment, Post
from schema import CategoryBase, CommentBase, PostCreate, UserBase, UserCreate
from typing import List, Optional
from fastapi.templating import Jinja2Templates
from pathlib import Path
import oauth2