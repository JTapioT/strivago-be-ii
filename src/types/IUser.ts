import {Document, Model, ObjectId} from "mongoose";

export default interface User extends Document  {
  _id: ObjectId
  email: string
  password?: string
  __v?: number
}

export interface UserModel extends Model<User> {
  checkCredentials(email: string, plainTextPassword: string): User | null;
}

/**
* Schema method toJson needs to have password and __v as optional for deletion not to throw error. Somehow this feels the wrong way to make password as an optional.
*/