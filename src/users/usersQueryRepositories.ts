import {IUserQueryType} from "./types/request-response-type";
import {IPaginatorUserViewModel, IUserDBType, IUserViewModel} from "./types/user-types";
import {userCollection} from "../db/mongo-db";
import {SortDirection} from "mongodb";

export const usersQueryRepositories = {
    getUsers: async (queryParams: IUserQueryType): Promise<IPaginatorUserViewModel | []> => {
        const query = usersQueryRepositories._createDefaultValues(queryParams);
        let search = {};
        if(query.searchLoginTerm && query.searchEmailTerm) {
            search = {
                $or: [
                    {email: {$regex: `${query.searchEmailTerm}`, $options: "i"}},
                    {login: {$regex: `${query.searchLoginTerm}`, $options: "i"}},
                ]
            }
        } else if(query.searchLoginTerm) {
            search = {login: {$regex: `${query.searchLoginTerm}`, $options: "i"}}
        } else {
            search = {email: {$regex: `${query.searchEmailTerm}`, $options: "i"}}
        }

        const filter = {
            ...search
        }

        try {
            const allUsers = await userCollection
                .find(filter)
                .sort(query.sortBy, query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray();

            const totalCount = await userCollection.countDocuments(filter);

            return {
                pagesCount: Math.ceil(totalCount/ query.pageSize),
                pageSize: query.pageNumber,
                page: query.pageSize,
                totalCount,
                items: usersQueryRepositories._maping(allUsers)
            }

        } catch (error) {
            console.log(error)
            return [];
        }
    },

    _maping: (users: IUserDBType[]): IUserViewModel[] => {
        return users.map(u => ({
            id: String(u._id),
            createdAt: u.createdAt,
            email: u.email,
            login: u.login,
        }))
    },
    _createDefaultValues: (query: IUserQueryType) => {
        return {
            pageNumber: query.pageNumber ? +query.pageNumber : 1,
            pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
            sortBy: query.sortBy ? query.sortBy : "createdAt",
            sortDirection: query.sortDirection ? query.sortDirection as SortDirection : "desc",
            searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm : null,
            searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm : null,
        }
    }
}