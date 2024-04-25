import {QueryType} from "../types/request-response-type";
import {createDefaultValues} from "../utils/helper";
import {blogCollection, postCollection} from "../db/mongo-db";
import {BlogOutputType, PaginatorBlog} from "../types/output-blog-type";
import {ObjectId} from "mongodb";
import {BlogDBType} from "../db/blog-types-db";
import {PostDBType} from "../db/post-types-db";
import {PostOutputType} from "../types/output-post-type";


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
                items: allPosts.map(x => blogsQueryRepositories._formatingDataForOutputPost(x))
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
                items: allBlogs.map(x => blogsQueryRepositories._formatingDataForOutputBlog(x))
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    findBlogById: async (id: string) => {
        try {
            const foundBlog = await blogCollection.findOne({_id: new ObjectId(id)});
            if (foundBlog) {
                return blogsQueryRepositories._formatingDataForOutputBlog(foundBlog);
            }
            return;
        } catch (e) {
            console.log(e)
            return;
        }

    },
    _formatingDataForOutputBlog: (input: BlogDBType):BlogOutputType => {
        return {
            id: String(input._id),
            name: input.name,
            description: input.description,
            websiteUrl: input.websiteUrl,
            createdAt: input.createdAt,
            isMembership: input.isMembership,
        };
    },
    _formatingDataForOutputPost: (input: PostDBType):PostOutputType => {
        return {
            id: String(input._id),
            blogId: input.blogId,
            content: input.content,
            createdAt: input.createdAt,
            shortDescription: input.shortDescription,
            blogName: input.blogName,
            title: input.title,
        };
    }
}
