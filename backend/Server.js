import app from "./src/app.js";
import dotenv from "dotenv";
import connectToDb from "./src/config/database.js";

dotenv.config();
connectToDb();

app.get("/", (req, res)=>{
    res.send("hello");
})

app.listen(process.env.PORT, ()=>{
    console.log(`app is listning on ${process.env.PORT}`);
});

export default app