import {Router} from 'express';
import {blogsControllers} from "../blogs/blogsControllers";
import {
    validationCreateBlog,
} from "../middleware/input-validation-blog-middleware";
import {authMiddleware} from "../middleware/auth-middleware";
import {inputCheckCorrectBlogIdMiddleware, inputCheckErrorsMiddleware} from "../middleware/inputCheckErrorsMiddleware";
import {validationQueryParamsBlogs} from "../middleware/query-validator-middleware";
import {validatorParamBlogId} from "../middleware/params-validator-middleware";
import {validationCreateSpecialPost} from "../middleware/input-validation-post-middleware";

export const blogsRouter = Router({});

blogsRouter.get('/', ...validationQueryParamsBlogs, inputCheckErrorsMiddleware, blogsControllers.getBlogs)
blogsRouter.get('/:id', blogsControllers.getBlog)
blogsRouter.post('/', authMiddleware, ...validationCreateBlog, inputCheckErrorsMiddleware, blogsControllers.createBlog)
blogsRouter.put('/:id', authMiddleware, ...validationCreateBlog, inputCheckErrorsMiddleware, blogsControllers.updateBlog)
blogsRouter.delete('/:id', authMiddleware, blogsControllers.deleteBlog)

blogsRouter.get('/:id/posts',
    ...validationQueryParamsBlogs,
    inputCheckErrorsMiddleware,
    validatorParamBlogId,
    inputCheckCorrectBlogIdMiddleware,
    blogsControllers.getAllPostsForBlog)

blogsRouter.post('/:id/posts',
    authMiddleware,
    ...validationCreateSpecialPost,
    inputCheckErrorsMiddleware,
    validatorParamBlogId,
    inputCheckCorrectBlogIdMiddleware,
    blogsControllers.createPostForSpecialBlog)