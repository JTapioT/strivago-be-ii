import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import User from "../../types/IUser";

export const UserSchema:Schema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String},
  role: {type: String, default: "Guest", enum: ["Guest", "Host"]}
}, {timestamps: true });

UserSchema.pre("save", async function(next) {
  const newUser = this as User;
  const userPassword = newUser.password;

  if(newUser.isModified("password")) {
    const hash = await bcrypt.hash(userPassword!, 10);
    newUser.password = hash;
  }
})

UserSchema.methods.toJSON = function() {
  const userDocument = this as User;
  const user = userDocument.toObject();
  delete user.password;
  delete user.__v;

  return user;
}

interface credentials {
  email: string | undefined
  plainTextPassword: string | undefined
}

UserSchema.statics.checkCredentials = async function (email, plainTextPassword) {
  const user:User = await this.findOne({ email });

  if(user) {
    const isPwdMatch = await bcrypt.compare(plainTextPassword!, user.password!);
    if(isPwdMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
}