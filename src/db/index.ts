import {PostDBType} from "./post-types-db";
import {BlogDBType} from "./blog-types-db";
import {IUserDBType} from "../users/types/user-types";

export type DBType = {
    posts: PostDBType[],
    blogs: BlogDBType[],
    users: IUserDBType[]
}