import {config} from "dotenv";

config();

export const SETTINGS = {
    PORT: process.env.PORT || 3000,
    PATH: {
        BLOGS: '/hometask_05/api/blogs',
        POSTS: '/hometask_05/api/posts',
        USERS: '/hometask_05/api/users',
        AUTH: '/hometask_05/api/auth',
        ALL_DELETE: '/hometask_05/api/testing'
    },
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost',
    DB_NAME: process.env.DB_NAME || 'it-incubator',
    BLOG_COLLECTION_NAME: 'blogs',
    POSTS_COLLECTION_NAME: 'posts',
    USERS_COLLECTION_NAME: 'users',
}

export const HTTP_STATUSES = {
    OK_200: 200,
    NOT_FOUND_404: 404,
    NO_CONTENT_204: 204,
    CREATED_201: 201,
    BED_REQUEST_400: 400,
    UNAUTHORIZED: 401
}