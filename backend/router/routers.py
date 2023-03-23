from fastapi import APIRouter
from .post import router as PostRouter 
from .user import router as UserRouter
from .auth import router as AuthRouter
from .comment import router as CommentRouter
from .homepage import router as HomeRouter
router = APIRouter()

router.include_router(PostRouter)
router.include_router(UserRouter)
router.include_router(AuthRouter)
router.include_router(CommentRouter)
# router.include_router(HomeRouter)