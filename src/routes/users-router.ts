import {Router} from "express";
import {usersController} from "../users/usersControllers";

export const usersRouter = Router({});

usersRouter.get('/', usersController.getAllUsers)
usersRouter.post('/', usersController.createUser)
usersRouter.delete('/:id', usersController.getAllUsers)