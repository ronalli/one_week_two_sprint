import {QueryType} from "../types/request-response-type";
import {createDefaultValues} from "../utils/helper";
import {postCollection} from "../db/mongo-db";
import {formatingDataForOutputPost} from "../utils/fromatingData";

export const postsQueryRepositories = {
    getAllPosts: async (queryParams: QueryType) => {
        const query = createDefaultValues(queryParams);

        try {
            const allPosts = await postCollection.find()
                .sort(query.sortBy, query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray();

            const totalCount = await postCollection.countDocuments();

            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount,
                items: allPosts.map(x => formatingDataForOutputPost(x))
            }

        } catch (error) {
            console.log(error);
        }
        return true;
    }
}