import jwt, { Jwt, VerifyErrors, JsonWebTokenError } from "jsonwebtoken";
import User from "../types/IUser";


function generateJWToken(payload:Object):Promise<JsonWebTokenError | Jwt> {
  function signToken(resolve:any, reject:any) { // What type to use?
    console.log(payload);
    jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: "15m"},
    (err, token) => {
      if(err) {
        reject(err);
      } else {
        resolve(token);
      }
    })
  }
  return new Promise(signToken);
}


export async function AuthenticateWithTokens(user:User) {
  const accessToken = await generateJWToken({_id: user._id});
  console.log(accessToken);
  return accessToken;
}


export function verifyJWToken(token: string):Promise<VerifyErrors | Object> {
  function verifyToken(resolve:any, reject:any) { // What type to use?
    jwt.verify(token, process.env.JWT_SECRET!, (error, decodedToken) => {
      if(error) {
        reject(error);
      } else {
        resolve(decodedToken);
      }
    })
  }
  return new Promise(verifyToken);
}
