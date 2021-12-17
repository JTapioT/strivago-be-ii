import express from "express";
import createHttpError from "http-errors";
import UserModel from "../models/users/model";
import { userLoginValidation } from "../validation.js";
import { validationResult } from "express-validator";


// Router
// Register is now just with plain email and password.
// Maybe add more info to user schema later, eg. firstName, lastName etc.

const registerRouter = express.Router();


registerRouter.post("/", async (req, res, next) => {
  try {
    const errorsList = validationResult(req);
    if (!errorsList.isEmpty()) {
      next(createHttpError(400, { errorsList }));
    }
    const newUser = new UserModel(req.body); 
    const {_id} = await newUser.save();
    res.send({_id});

  } catch (error) {
    console.log(error);
    next(error);
    }
  }
);

export default registerRouter;