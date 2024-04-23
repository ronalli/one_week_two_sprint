import {Router} from "express";
import {usersController} from "../users/usersControllers";

export const usersRouter = Router({});

usersRouter.get('/', usersController.getAllUsers)
usersRouter.post('/', (req, res) => {})
usersRouter.delete('/:id', (req, res) => {})