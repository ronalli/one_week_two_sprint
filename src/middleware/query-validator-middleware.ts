import {query} from "express-validator";
import {BlogOutputType} from "../types/output-blog-type";
import {PostOutputType} from "../types/output-post-type";
import {sortDirection} from "../types/request-response-type";

const validatorQuerySortByBlogs = query('sortBy').optional().custom(value => {
    const query: Array<keyof BlogOutputType> = ["createdAt", "description", "id", "isMembership", "name", "websiteUrl"]
    return query.includes(value);
}).withMessage('Field sortBy incorrect')

const validatorQuerySortByPost = query('sortBy').optional().custom(value => {
    const query: Array<keyof PostOutputType> = ["createdAt", "blogId", "blogName", "content", "title", "shortDescription", "id"]
    return query.includes(value);
}).withMessage('Field sortBy incorrect')

const validatorQueryPageNumber = query('pageNumber').optional().isInt().withMessage('Field pageNumber is incorrect');
const validatorQueryPageSize = query('pageSize').optional().isInt().withMessage('Field pageSize is incorrect');
const validatorQuerySearchNameTerm = query('searchNameTerm').optional().isString().withMessage('Field pageSize is incorrect');
const validatorQuerySortDirection = query('sortDirection').optional().custom(value => sortDirection.hasOwnProperty(value)).withMessage('Field sortDirection is incorrect');


export const validationQueryParamsBlogs = [validatorQuerySortByBlogs, validatorQueryPageNumber, validatorQueryPageSize, validatorQuerySearchNameTerm, validatorQuerySortDirection]
export const validationQueryParamsPosts = [validatorQuerySortByPost, validatorQueryPageNumber, validatorQueryPageSize, validatorQuerySearchNameTerm, validatorQuerySortDirection]