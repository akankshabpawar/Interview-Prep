import mongoose from "mongoose";

async function connectToDb(){
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("conected to DB");
    }catch(err){
        console.log(err);
    }
}

export default connectToDb