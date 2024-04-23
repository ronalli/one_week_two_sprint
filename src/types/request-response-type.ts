import {Sort, SortDirection} from "mongodb";

export type ParamType = {
    id: string
}

export enum sortDirection {
    asc = 'asc',
    desc = 'desc'
}

export type BodyTypePost = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

export type BodyTypeBlog = {
    name: string
    description: string
    websiteUrl: string
}

export type QueryType = {
    pageNumber?: number,
    pageSize?: number,
    sortBy?: string,
    sortDirection?: SortDirection,
    searchNameTerm?: string
}