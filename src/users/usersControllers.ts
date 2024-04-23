import {usersQueryRepositories} from "./usersQueryRepositories";
import {Request, Response} from "express";
import {HTTP_STATUSES} from "../settings";
import {IUserQueryType} from "./types/request-response-type";

export const usersController = {
    getAllUsers: async (req: Request, res: Response) => {

        const queryParams: IUserQueryType = req.query;
        const allUsers = await usersQueryRepositories.getUsers(queryParams);
        res.status(HTTP_STATUSES.OK_200).json(allUsers)
    },
    createUser: async (req: Request, res: Response) => {},
    deleteUser: async (req: Request, res: Response) => {}
}