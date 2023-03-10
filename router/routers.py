from fastapi import APIRouter
from .post import router as PostRouter 
from .user import router as UserRouter
from .auth import router as AuthRouter
from .category import router as CategoryRouter

router = APIRouter()

router.include_router(PostRouter)
router.include_router(UserRouter)
router.include_router(AuthRouter)
router.include_router(CategoryRouter)