import { body } from 'express-validator';

export const userLoginValidation = [
  body("email").exists().isEmail().withMessage("Email is mandatory"),
  body("password").exists().isString().withMessage("Password is required for registration")
]