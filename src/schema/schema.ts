import mongoose, { Schema, model } from "mongoose";

// User Schema
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Admin Schema
const adminSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageLink: { type: String, required: true },
})


export const User = model("User", userSchema);
export const Admin = model("Admin", adminSchema);
export const Course = model("Course",courseSchema);
