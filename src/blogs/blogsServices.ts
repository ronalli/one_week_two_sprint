import {BodyTypeBlog} from "../types/request-response-type";
import {blogsMongoRepositories} from "./blogsMongoRepositories";


export const blogsServices = {
    createBlog: async(blog: BodyTypeBlog)=> {
        return await blogsMongoRepositories.create(blog)
    },
    updateBlog: async (id: string, inputUpdateBlog: BodyTypeBlog) => {
        return await blogsMongoRepositories.update(id, inputUpdateBlog);
    },
    deleteBlog: async (id: string) => {
        return await blogsMongoRepositories.delete(id);
    }
}