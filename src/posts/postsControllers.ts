import {Request, Response} from 'express'
import {HTTP_STATUSES} from "../settings";

import {BodyTypePost, ParamType, QueryType} from "../types/request-response-type";
import {postsMongoRepositories} from "./postsMongoRepositories";
import {postsQueryRepositories} from "./postsQueryRepositories";

export const postsControllers = {
    createPost: async (req: Request, res: Response) => {
        const inputDataPost = req.body as BodyTypePost;
        const newPosts = await postsMongoRepositories.createPost(inputDataPost);
        if (!newPosts) {
            res.status(HTTP_STATUSES.BED_REQUEST_400).send({})
            return
        }
        res.status(HTTP_STATUSES.CREATED_201).send(newPosts)
        return;
    },
    getPost: async (req: Request, res: Response) => {
        const {id} = req.params as ParamType;
        const findPost = await postsMongoRepositories.findPostById(id)
        if (findPost) {
            res.status(HTTP_STATUSES.OK_200).send(findPost)
            return
        }
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({})
        return
    },
    getPosts: async (req: Request, res: Response) => {
        const queryParams: QueryType = req.query;
        const findPosts = await postsQueryRepositories.getAllPosts(queryParams)
        res.status(HTTP_STATUSES.OK_200).send(findPosts)
    },
    updatePost: async (req: Request, res: Response) => {
        const {id} = req.params as ParamType;
        const updateDataPost = req.body as BodyTypePost;
        const flag = await postsMongoRepositories.updatePost(id, updateDataPost)
        if (flag) {
            res.status(HTTP_STATUSES.NO_CONTENT_204).send({})
            return
        }
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({})
        return;
    },
    deletePost: async (req: Request, res: Response) => {
        const {id} = req.params as ParamType;
        const flag = await postsMongoRepositories.deletePost(id);
        if (flag) {
            res.status(HTTP_STATUSES.NO_CONTENT_204).send({});
            return;
        }
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({})
    },
}

