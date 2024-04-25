import {BodyTypeBlog} from "../types/request-response-type";
import {blogCollection} from "../db/mongo-db";
import {ObjectId} from "mongodb";
import {formatingDataForOutputBlog} from "../utils/fromatingData";

export const blogsMongoRepositories = {
    create: async (blog: BodyTypeBlog) => {
        const newBlog = {
            ...blog,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        try {
            const insertedBlog = await blogCollection.insertOne(newBlog);
            const foundBlog = await blogCollection.findOne({_id: insertedBlog.insertedId})
            if (foundBlog) {
                return formatingDataForOutputBlog(foundBlog)
            }
            return;
        } catch (e) {
            console.log(e)
            return;
        }
    },
    update: async (id: string, inputUpdateDataBlog: BodyTypeBlog) => {
        const {name, websiteUrl, description} = inputUpdateDataBlog
        try {
            const findBlog = await blogCollection.findOne({_id: new ObjectId(id)});
            if (findBlog) {
                await blogCollection.findOneAndUpdate({_id: new ObjectId(id)}, {
                    $set: {
                        name,
                        description,
                        websiteUrl
                    }
                });
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e)
            return false;
        }
    },
    delete: async (id: string) => {
        try {
            const flag = await blogCollection.findOne({_id: new ObjectId(id)});
            if (!flag) {
                return false;
            } else {
                await blogCollection.findOneAndDelete({_id: new ObjectId(id)});
                return true;
            }
        } catch (e) {
            console.log(e)
            return;
        }
    },
}