"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.Course = exports.Admin = exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Schema
const adminSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    email: String,
    type: String,
    mycourses: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Course" }]
});
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    email: String,
    mycourses: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Course" }],
});
const courseSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    price: String,
    image: String,
    teacher: String,
    stars: Number,
    level: String,
    reviews: [String],
    published: Boolean,
    adminId: mongoose_1.default.Schema.Types.ObjectId
});
// Models
const Users = mongoose_1.default.model("User", userSchema);
exports.Users = Users;
const Admin = mongoose_1.default.model("Admin", adminSchema);
exports.Admin = Admin;
const Course = mongoose_1.default.model("Course", courseSchema);
exports.Course = Course;
const connect = () => {
    try {
        const mongo_url = process.env.MONGODB_URL;
        mongoose_1.default.connect(String(mongo_url));
    }
    catch (e) {
        console.log({
            error: "unable to connect to database"
        });
    }
};
exports.connect = connect;
