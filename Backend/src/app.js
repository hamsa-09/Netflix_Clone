import express from "express";
import {env} from "./config/env.js"
import morgan from "morgan";
import {connectDB} from "./config/db.js"
import logger from "./config/logger.js"

const app=express();
connectDB();
if(env.NODE_ENV==="development"){
    app.use(morgan("dev"));
}
app.use(express.json());

export default app;
