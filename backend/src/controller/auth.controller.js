import userModel from "../models/user.model.js";
import tokenBlacklistModel from "../models/tokenBlackList.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

/**
 * @route /api/auth/register
 * @desc uniq username, email, password
 * @access public 
 */
async function registerUser(req, res){
    try{
        const {username, email, password } = req.body;

        if(!username || !email || !password){
            return res.status(400).json({
                message : "please provide username, email and password"
            })
        }

        const isUserExists = await userModel.findOne({
            $or: [{username}, {email}]
        })

        if(isUserExists){
            return res.status(400).json({
                message:"account with this username or email already exists"
            })
        }

        const hash = await bcrypt.hashSync(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hash
        })

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SEC,
            { expiresIn: "1d" }
        );

        res.cookie("token", token);

        res.status(200).json({
            message: "user created successfully",
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        })
    }
    catch(err){
        console.log(err)
    }
}

/**
 * @route /api/auth/login
 * @desc email, password
 * @access public 
 */
async function loginUser(req, res){
    try{

        const{ email, password}= req.body;

        const user = await userModel.findOne({ email})

        if(!user){
            return res.status(400).json({
                message: "email and password is invalid"
            })
        }

        const isValisPassword = await bcrypt.compare(password, user.password);

        if(!isValisPassword){
            return res.status(400).json({
                message: "password is invalid"
            }) 
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SEC,
            { expiresIn: "1d" }
        );

        res.cookie("token", token);

        res.status(200).json({
            message: "user loggedIn successfully",
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        })
    }
    catch(err){
        console.log(err);
    }
}

/**
 * @route /api/auth/logout
 * @desc Token should blacklist
 * @access public 
 */
async function logoutUser(req, res){
    try{
        const token = req.cookies.token;
        if(token){
            await tokenBlacklistModel.create({ token })
        }

        res.clearCookie("token");
        res.status(200).json({
            message: "user logged out successfully"
        })
    }
    catch(err){
        console.log(err);
    }
}



async function getmeUser(req, res){

    const user = req.user
    const userInfo = await userModel.findById(user.id);

    return res.status(200).json({
        message: "user details fetched successfully",
        user: {
            id: userInfo._id,
            username: userInfo.username,
            email: userInfo.email
        }
    })

}

export {registerUser, loginUser, logoutUser, getmeUser};