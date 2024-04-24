import {Router} from "express";
import {usersController} from "../users/usersControllers";
import {validationQueryUsers} from "../users/middleware/query-validation-middleware";
import {inputCheckErrorsMiddleware} from "../users/middleware/inputCheckErrorsMiddleware";
import {validationInputBodyUser} from "../users/middleware/input-validation-middleware";

export const usersRouter = Router({});

usersRouter.get('/', ...validationQueryUsers, inputCheckErrorsMiddleware, usersController.getAllUsers)
usersRouter.post('/', ...validationInputBodyUser, inputCheckErrorsMiddleware, usersController.createUser)
usersRouter.delete('/:id', usersController.deleteUser)