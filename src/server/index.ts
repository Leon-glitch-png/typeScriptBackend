import express,{Request,Response} from "express";
import mongoose from "mongoose";
import cors from "cors";
import adminRoute from "../adminRoute/auth";
import userRoute from "../userRoute/user";
import cookieParser from 'cookie-parser';
import { Course } from "../schema/schema";





const app = express();

app.use(cors());
app.use(express.json());
app.use("/admin",adminRoute);
app.use("/user",userRoute);
app.use(cookieParser());
mongoose.connect("mongodb+srv://dbUser:dbUserPassword@cluster0.kfjyvcn.mongodb.net",{dbName:"Course"})

app.listen(3000,()=>{
    console.log("listening on port 3000");
})
