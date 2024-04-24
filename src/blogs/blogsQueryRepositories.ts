import {QueryType} from "../types/request-response-type";
import {createDefaultValues} from "../utils/helper";
import {blogCollection, postCollection} from "../db/mongo-db";
import {formatingDataForOutputBlog, formatingDataForOutputPost} from "../utils/fromatingData";
import {PaginatorBlog} from "../types/output-blog-type";


export const blogsQueryRepositories = {

    getAndSortPostsSpecialBlog: async (blogId: string, queryParams: QueryType) => {

        const query = createDefaultValues(queryParams);

        const search = query.searchNameTerm ? {title: {$regex: query.searchNameTerm, $options: "i"}} : {}

        const filter = {
            blogId,
            ...search
        }

        try {
            const allPosts = await postCollection
                .find(filter)
                .sort(query.sortBy, query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray();


            const totalCount = await postCollection.countDocuments(filter);

            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount,
                items: allPosts.map(x => formatingDataForOutputPost(x))
            }


        } catch (e) {
            console.log(e)
            return []
        }
    },

    getAllBlogs: async (queryParams: QueryType): Promise<PaginatorBlog | []> => {
        const query = createDefaultValues(queryParams);

        const search = query.searchNameTerm ? {name: {$regex: `${query.searchNameTerm}`, $options: "i"}} : {}

        const filter = {
            ...search
        }

        try {
            const allBlogs = await blogCollection
                .find(filter)
                .sort(query.sortBy, query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray();


            const totalCount = await blogCollection.countDocuments(filter);

            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount,
                items: allBlogs.map(x => formatingDataForOutputBlog(x))
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}
