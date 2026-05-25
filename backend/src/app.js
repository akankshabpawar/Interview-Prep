import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// import all route from routes
import authRouter from "./routes/auth.routes.js";

// configs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/auth", authRouter); //all auth routes define in auth.routes file


export default app;