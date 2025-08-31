import {env} from "../config/env.js"
import logger from "../config/logger.js";
const errorHandler=(err,req,res,next)=>{
    logger.error(err.message,{
        stack:err.stack,
        path:req.originalUrl
    })
    const statusCode=res.statusCode===200?500:res.statusCode;
    res.status(statusCode).json({
        success:false,
        messge:err.message || "Something went wrong",
        stack:env.NODE_ENV==="production"?null:err.stack,
    })
}
export default errorHandler;
