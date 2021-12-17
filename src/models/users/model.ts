import mongoose from "mongoose";
import { UserSchema } from "./schema";
import { UserModel } from "../../types/IUser";
import User from "../../types/IUser";


const UserModel = mongoose.model<User, UserModel>("user", UserSchema);

export default UserModel;