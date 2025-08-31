import express from "express";
import {env} from "./config/env.js"
import morgan from "morgan";
import {connectDB} from "./config/db.js"
import cookieParser from "cookie-parser"
import errorHandler from "./middleware/errormiddleware.js";
import router from "./routes/authRoutes.js";
import moviesRoutes from "./routes/movieRoutes.js"

const app=express();
connectDB();

if(env.NODE_ENV==="development"){
    app.use(morgan("dev"));
}
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth",router)
app.use("/api/movies/",moviesRoutes)
app.use(errorHandler)
export default app;
