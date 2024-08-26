import jwt from "jsonwebtoken";
import express from "express";
const router = express.Router();
import { Authentication, secret } from "../middlerware/index";
import { Admin, Course } from "../schema/schema";
import { runInNewContext } from "vm";
import { strict } from "assert";

router.post("/signup", async (req, res) => {
    const data = req.body;
    const { username, email, password } = data;
    try {
        const user = new Admin({ username, email, password });
         await user.save();
        const token =  jwt.sign({ username, email}, secret, { expiresIn: '24h' });
        res.cookie("token", `Bearer ${token}`, {
            // httpOnly: true,
            // sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,



        });
        
        res.status(201).json({ message: "Admin created successfully" ,user});
    } catch (error: unknown) {


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

router.post("/signin", async (req, res) => {
    const data = req.body;
    const { username, email, password } = data;
    try {
        const user = await Admin.findOne({ username, email, password });
        if (!user) {
            return res.status(404).json({ message: 'Invalid credential' });
        }

        const token = jwt.sign({ username, email}, secret, { expiresIn: '24h' });
        res.cookie("token", `Bearer ${token}`, {
            // httpOnly: true,
            // sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,// one-week
            
        })
        res.status(201).json({ message: "Admin created successfully" ,user});
    } catch (error: unknown) {
        if (typeof (error) === "string") {
            // console.error("String error:", error);
            res.status(403).json({ message: error });
        } else if (error instanceof Error) {
            // console.error("Error object:", error.message);
            res.status(403).json({ message: error.message });


        } else {
            res.status(500).json({ message: "Internal server error" })
        }
    }
})


router.post("/course", Authentication, async (req, res) => {

    const data = req.body;
    const { title, description, price, imageLink } = data;
    console.log(`${title},${description},${price},${imageLink}`);
    try {
        const course = new Course({ title, description, price, imageLink });
        await course.save();
        res.status(201).json({ message: "Course created successfully" ,course});

    } catch (error: unknown) {
        if (typeof (error) === "string") {
            // console.error("String error:", error);
            res.status(403).json({ message: error });
        } else if (error instanceof Error) {
            // console.error("Error object:", error.message);
            res.status(403).json({ message: error.message });


        } else {
            res.status(500).json({ message: "Internal server error" })
        }


    }


})

router.get("/courses", Authentication, async (req, res) => {
    try {

        const course = await Course.find();
        if (!course) {
            return res.status(404).json({ message: 'course not found' });
        }
        res.status(200).json(course)
    } catch (error: unknown) {
        if (typeof (error) === "string") {
            // console.error("String error:", error);
            res.status(403).json({ message: error });
        } else if (error instanceof Error) {
            // console.error("Error object:", error.message);
            res.status(403).json({ message: error.message });


        } else {
            res.status(500).json({ message: "Internal server error" })
        }

    }

})

router.get("/courses/:title", Authentication, async (req, res) => {
    const title = req.params.title;
    try {
        const course = await Course.findOne({ title });
        if (!course) {
            return res.status(404).json({ message: 'course not found' });
        }
        res.status(200).json(course)

    } catch (error: unknown) {
        if (typeof (error) === "string") {
            // console.error("String error:", error);
            res.status(403).json({ message: error });
        } else if (error instanceof Error) {
            // console.error("Error object:", error.message);
            res.status(403).json({ message: error.message });


        } else {
            res.status(500).json({ message: "Internal server error" })
        }
    }



})





export default router;