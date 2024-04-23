import {param} from "express-validator";
import {blogCollection} from "../db/mongo-db";
import {ObjectId} from "mongodb";

export const validatorParamBlogId = param("id")
    .custom(async value => {
        const isValidBlogId = await blogCollection.findOne({_id: new ObjectId(value)});
        if(!isValidBlogId) {
            throw new Error('Field blogId is incorrect')
        }
        return true
    })