import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { env } from "../config/env.js";
const authMiddleware = async (req, res, next) => {
  let token = req.cookies.jwt;
  try{
    if(!token){
        return res.status(401).json({message:"Unauthorised"});
    }
    const decoded=jwt.verify(token,env.JWT_SECRET);
    req.user=decoded;
    next();
  }
  catch(error){
      return res.status(500).json({
            message:"Unauthorized",
            error:error.message
        })
  }

};

export default authMiddleware;
