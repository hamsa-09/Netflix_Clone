import { env } from "../config/env.js";
import jwt from "jsonwebtoken"

export const generateToken=(res,payload)=>{
    const token=jwt.sign(payload,env.JWT_SECRET,{
        expiresIn:"2h",
    })
    res.cookie('jwt',token,{
        httpOnly:true,
        secure:false,
        SameSite:"Lax",
        path:"/",
        maxAge:3600*2000
    })
}
