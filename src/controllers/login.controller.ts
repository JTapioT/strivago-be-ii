import express, { RequestHandler } from "express";
import UserModel from "../models/users/model";
import { AuthenticateWithTokens } from "../auth/tools";
import createHttpError from "http-errors"
import { validationResult } from "express-validator";
import { userLoginValidation } from "../validation";


const loginRouter = express.Router();

//loginRouter.use(userLoginValidation);


interface loginBody {
  email: string,
  password: string,
}


loginRouter.post("/", async (req,res,next) => {
  try {
   /*  const errorsList = validationResult(req);
    if (!errorsList.isEmpty()) {
      next(createHttpError(400, { errorsList }));
    } */
    const {email, password} = req.body as loginBody;
    const user = await UserModel.checkCredentials(email!,password!);

    if(user) {
      const accessToken = await AuthenticateWithTokens(user);
      res.send({accessToken});
    } else {
      next(createHttpError(401, "Please check credentials again."))
    }
  } catch (error) {
    console.log(error);
    next(error)
  }
})

export default loginRouter