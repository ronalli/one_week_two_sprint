import {Router} from "express";
import {usersController} from "../users/usersControllers";
import {validationQueryUsers} from "../users/middleware/query-validation-middleware";
import {inputCheckErrorsMiddleware} from "../users/middleware/inputCheckErrorsMiddleware";
import {validationInputBodyUser} from "../users/middleware/input-validation-middleware";
import {authMiddleware} from "../middleware/auth-middleware";

export const usersRouter = Router({});

usersRouter.get('/', authMiddleware, ...validationQueryUsers, inputCheckErrorsMiddleware, usersController.getAllUsers)
usersRouter.post('/', authMiddleware, ...validationInputBodyUser, inputCheckErrorsMiddleware, usersController.createUser)
usersRouter.delete('/:id', authMiddleware, usersController.deleteUser)