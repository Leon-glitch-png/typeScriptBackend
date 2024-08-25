import express from "express";
 const router = express.Router();
 import jwt from "jsonwebtoken";
 import {AuthenticationUser,SECRET} from "../middlerware/index";
 import {User,Course} from "../schema/schema";

 router.post("/signup",async(req, res)=>{

    try{
        const {username,email,password}=req.body;
        const user = new User({username,email,password});
        await user.save();

        const token =  jwt.sign({username,email, password},SECRET,{expiresIn:24});
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:24*60*60*1000,
            sameSite:"strict"
        })

    }catch(error:unknown){
        if (typeof error === 'string') {
            // console.error("String error:", error);
            res.status(403).json({ message: error });
        } else if (error instanceof Error) {
            // console.error("Error object:", error.message);
            res.status(403).json({ message: error.message });
        } else {
            res.status(403).json({ message: "Error occurred" });
        }

    }
 

 })

 router.post("/login",async(req, res)=>{
    try{
        const {username, email,password}=req.body;
        const user = await User.findOne({username,email, password});
        if(!user){
            return res.status(401).json({message:"Invalid credentials"})
        }
        const token =  jwt.sign({username,email, password},SECRET,{expiresIn:24});
        res.cookie("token", token, {
            httpOnly:true,
            maxAge:24*60*60*1000,
            sameSite:"strict"
        })
    }catch(error:unknown){
        if(typeof(error)==="string"){
                res.status(403).json({message:error});
        }else if(error instanceof Error){
            res.status(403).json({message:error.message});
        }else {
            res.status(403).json({message:"Error occurred"});
        }
    }

 })

 router.get("/courses",AuthenticationUser, async(req, res)=>{

    try{
        const courses = await Course.find();
        res.json(courses);
    }catch(error:unknown){
        if(typeof(error)==="string"){
            res.status(403).json({message:error});
            }else if(error instanceof Error){
                res.status(403).json({message:error.message});
                }else {
                    res.status(403).json({message:"Error occurred"});
                    }
    }
   
 })

 router.get("/courses/:title", AuthenticationUser, async(req,res)=>{
    try{
        const title = req.params.title;
        const course = await Course.findOne({title});
        if(!course){
            return res.status(404).json({message:"Course not found"});
        }
        res.json(course);
    }catch(error:unknown){
        if(typeof(error)==="string"){
            res.status(403).json({message:error});
            }else if(error instanceof Error){
                res.status(403).json({message:error.message});
                }else {
                    res.status(403).json({message:"Error occurred"});
                    }


    }
 })




export default router;