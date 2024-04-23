import {Request, Response} from "express";
import {HTTP_STATUSES} from "../settings";
import {BodyTypeBlog, BodyTypePost, ParamType, QueryType} from "../types/request-response-type";
import {blogsMongoRepositories} from "./blogsMongoRepositories";
import {blogsQueryRepositories} from "./blogsQueryRepositories";
import {postsMongoRepositories} from "../posts/postsMongoRepositories";

export const blogsControllers = {
    createBlog: async (req: Request, res: Response) => {
        const inputDataBlog = req.body as BodyTypeBlog
        const createdBlog = await blogsMongoRepositories.createBlog(inputDataBlog);
        if (createdBlog) {
            res.status(HTTP_STATUSES.CREATED_201).send(createdBlog)
            return;
        }
        res.status(HTTP_STATUSES.BED_REQUEST_400).send({})
    },
    getBlog: async (req: Request, res: Response) => {
        const {id}= req.params as ParamType;
        const blog = await blogsMongoRepositories.findBlogById(id);
        if(blog) {
            res.status(HTTP_STATUSES.OK_200).send(blog)
            return
        }
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({})
    },
    getBlogs: async (req: Request, res: Response) => {

        const queryParams: QueryType = req.query;

        const findBlogs = await blogsQueryRepositories.getAllBlogs(queryParams);
        return res.status(HTTP_STATUSES.OK_200).send(findBlogs)
    },
    updateBlog: async (req: Request, res: Response) => {
        const {id} = req.params;
        const inputUpdateDataBlog = req.body as BodyTypeBlog;
        const flag = await blogsMongoRepositories.updateBlog(id, inputUpdateDataBlog)
        if(flag) {
            return res.status(HTTP_STATUSES.NO_CONTENT_204).send({})
        }
        return res.status(HTTP_STATUSES.NOT_FOUND_404).send({})
    },
    deleteBlog: async (req: Request, res: Response) => {
        const {id} = req.params;
        const flag = await blogsMongoRepositories.deleteBlog(id);
        if(flag) {
            res.status(HTTP_STATUSES.NO_CONTENT_204).send({})
            return
        }
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({})
        return
    },
    getAllPostsForBlog: async (req: Request, res: Response) => {
        const {id} = req.params;
        const queryParams: QueryType = req.query;

        const result = await blogsQueryRepositories.getAndSortPostsSpecialBlog(id, queryParams)

        res.status(HTTP_STATUSES.OK_200).send(result)
    },

    createPostForSpecialBlog: async (req: Request, res: Response) => {
        const inputDataPost = req.body;
        const {id} = req.params as ParamType;

        const post = {
            blogId: id,
            ...inputDataPost
        }

        const createdPost = await postsMongoRepositories.createPost(post);

        if (!createdPost) {
            res.status(HTTP_STATUSES.BED_REQUEST_400).send({})
            return
        }
        res.status(HTTP_STATUSES.CREATED_201).send(createdPost)
        return;
    }
}