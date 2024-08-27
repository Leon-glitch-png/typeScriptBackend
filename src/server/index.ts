import express,{Request,Response} from "express";
import mongoose from "mongoose";
import cors from "cors";
import adminRoute from "../adminRoute/auth";
import userRoute from "../userRoute/user";
import cookieParser from 'cookie-parser';
import { Course } from "../schema/schema";






const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3001', // Replace with your client’s domain
    credentials: true, // Allow cookies and credentials
}));

app.use("/admin",adminRoute);
app.use("/user",userRoute);

mongoose.connect("mongodb+srv://dbUser:dbUserPassword@cluster0.kfjyvcn.mongodb.net",{dbName:"Course"})




app.listen(3000,()=>{
    console.log("listening on port 3000");
})
