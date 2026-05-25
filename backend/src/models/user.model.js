import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [true, "username already taken"],
        require: true
    },
    email:{
        type: String,
        unique: [true, "account with this email already exists"],
        require: true
    }, 
    password:{
        type: String,
        require: true
    }
});

const userModel = mongoose.model("users", userSchema);

export default userModel;