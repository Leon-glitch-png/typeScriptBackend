import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";


export const secret = "This_is_my_admin_secret";
export const SECRET = "This_is_my_user_secret";
import { NextFunction,Request,Response } from "express";

 export  function Authentication( req:Request,res:Response,next:NextFunction){


    const auth = req.cookies.token;
    if (!auth) {
        return res.status(401).json({ message: "You are not authenticated" });
    }
    const token = (auth.split(" "))[1];

    try{
        const decoded = jwt.verify(token, secret);
        next();
    }catch(e){
        return res.status(401).json({ message: "You are not authenticated" });
    }

    

}

 export  function AuthenticationUser(req:Request, res:Response, next:NextFunction){

    const auth = req.cookies.token;
    if(!auth){
        return res.status(401).json({ message: "You are not authenticated" });
    }

    const token = auth.split(" ")[1];

    try{
        const decoded = jwt.verify(token, SECRET);
        next();
    }catch(e){
        return res.status(401).json({ message: "You are not authenticated" });
    }
 }
    
