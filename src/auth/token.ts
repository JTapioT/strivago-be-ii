import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verifyJWToken } from "./tools";
import UserModel from "../models/users/model";
import User from "../types/IUser.js";

export default async function JWTAuth(req:Request,res:Response,next:NextFunction) {
  try {

    if(req.headers.authorization) {
      const jwtoken = req.headers.authorization.replace("Bearer ", "");
      //const jwtoken = req.headers.authorization.split("Bearer ", "");
      const decodedToken = await verifyJWToken(jwtoken);

      const user = await UserModel.findById(decodedToken._id);

      if(user) {
        req.user = user;
        next();
      } else {
        next(createHttpError(404, "User not found."));
      }
    } else {
      next(createHttpError(401, "Please provide authorization token."))
    }
  } catch (error) {
    console.log(error);
    next(error) 
  }
}