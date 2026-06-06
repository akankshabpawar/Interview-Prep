import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/tokenBlackList.model.js";

async function getmeMiddleware(req, res, next){

    const token = req.cookies.token;

    if(!token){
        return res.status(400).json({
            message : "token not found"
        })
    }

    const isBlacklisted = await tokenBlacklistModel.findOne({token});

    if(isBlacklisted){
        return res.status(400).json({
            message: "invalid token"
        })
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SEC);
        req.user = decoded;
        next();

    }
    catch(err){
        return res.status(400).json({
            message: "invalid token"
        })
    }

}

export default getmeMiddleware