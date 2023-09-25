import mongoose from "mongoose";
import { string } from "zod";

// Schema
const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    type: String,
    mycourses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}]
})

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    cart: [{type: mongoose.Schema.Types.ObjectId, ref:"Course"}],
    mycourses:  [{type: mongoose.Schema.Types.ObjectId, ref:"Course"}],
})

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    image: String,
    teacher: String,
    stars: Number,
    level: String,
    reviews: [String],
    published: Boolean,
    adminId: mongoose.Schema.Types.ObjectId
})

// Models
const Users = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema)

const connect = () => {
    try{
    const mongo_url = process.env.MONGODB_URL;
    mongoose.connect(String(mongo_url))
    }
    catch(e){
        console.log({
            error: "unable to connect to database"
        });
    }
}
export {
    Users,
    Admin,
    Course,
    connect
}