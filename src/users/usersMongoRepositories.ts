import {IUserDBType, IUserInputModel, IUserViewModel} from "./types/user-types";
import {userCollection} from "../db/mongo-db";
import {ObjectId} from "mongodb";

export const usersMongoRepositories = {
    createUser: async (data: IUserInputModel):Promise<IUserViewModel | undefined> => {
        const newUser = {
            ...data,
            createdAt: new Date().toISOString(),
        }

        try {
            const insertUser = await userCollection.insertOne(newUser);
            const foundUser = await usersMongoRepositories.findUserById(String(insertUser.insertedId))

            if(foundUser) {
                return usersMongoRepositories._maping(foundUser);
            }
            return;
        } catch (e) {
            console.error(e);
            return;
        }

    },
    findUserById: async (id: string): Promise<IUserDBType | undefined> => {
        try {

            const foundUser = await userCollection.findOne({_id: new ObjectId(id)})
            if(foundUser) {
                return foundUser;
            }
            return;

        } catch (e) {
            console.error(e);
            return;
        }
    },

    _maping: (user: IUserDBType): IUserViewModel => {
        return {
            id: String(user._id),
            createdAt: user.createdAt,
            email: user.email,
            login: user.login,
        }
    }
}