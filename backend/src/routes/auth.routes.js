import express from "express";
import {registerUser, loginUser, logoutUser, getmeUser} from "../controller/auth.controller.js";
import { getmeMiddleware } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

// api/auth
authRouter.get("/", (req, res) => {
    res.send("Auth Route");
});

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/logout", logoutUser);
authRouter.get("/getme", getmeMiddleware, getmeUser)

export default authRouter;