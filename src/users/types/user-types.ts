import {ObjectId} from "mongodb";

export interface IUserInputModel {
    login: string;
    password: string;
    email: string;
}

export interface IUserViewModel {
    id: string;
    login: string;
    email: string;
    created_at: string;
}

export interface IUserDBType  {
    _id: ObjectId;
    login: string;
    email: string;
    created_at: string;
}

export interface IPaginatorUserViewModel {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: IUserViewModel[];
}