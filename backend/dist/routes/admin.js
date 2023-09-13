"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../authentication/auth");
const router = express_1.default.Router();
const secret = String(process.env.JWT_SECRET);
const signProps = zod_1.z.object({
    username: zod_1.z.string().max(20),
    password: zod_1.z.string(),
});
// const courseProps = z.object({
// title: z.string(),        //do it later
//   description: z.string()
// })
router.get("/me", auth_1.authenticateAdmin, (req, res) => {
    res.json({
        id: req.headers.adminId,
    });
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = signProps.safeParse(req.body);
    if (!inputs.success) {
        res.status(411).json({
            error: inputs.error,
        });
        return;
    }
    const username = inputs.data.username;
    const password = inputs.data.password;
    const isAdmin = yield db_1.Admin.findOne({ username, password });
    if (!isAdmin) {
        const type = "admin";
        const adminData = { username, password, type };
        const newAdmin = yield new db_1.Admin(adminData);
        yield newAdmin.save();
        const token = jsonwebtoken_1.default.sign({ id: newAdmin._id }, secret, { expiresIn: "6h" });
        res.json({
            msg: "Admin signed in successfully",
            token,
        });
    }
    else {
        res.status(409).json({ message: "Admin already present. Try signing in" });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = signProps.safeParse(req.body);
    if (!inputs.success) {
        res.status(411).json({
            error: inputs.error,
        });
        return;
    }
    const username = inputs.data.username;
    const password = inputs.data.password;
    const admin = yield db_1.Admin.findOne({ username, password });
    if (!admin) {
        res.status(404).json({ message: "Admin not found. Sign in first" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: admin._id }, secret, { expiresIn: "6h" });
    res.json({ message: "Signed in successfully", token });
}));
router.post("/courses", auth_1.authenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield db_1.Course.find({});
    let { title, description, price, image, teacher } = req.body;
    if (typeof image === "undefined") {
        image =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp_f_9Q54YeTLXDwRAy_xciq9s4MLAgU4G7g&usqp=CAU";
    }
    const adminId = req.headers.adminId;
    console.log("ADMIN", adminId);
    const course = new db_1.Course({
        title: title,
        description: description,
        price: price,
        image: image,
        teacher: teacher,
        adminId: adminId,
    });
    yield course.save();
    res.json({ message: "Course added successfully", courses: course });
}));
router.get("/courses", auth_1.authenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield db_1.Course.find({ adminId: req.headers.adminId });
    if (!courses) {
        res.sendStatus(404).json({
            msg: "Courses not found",
        });
        return;
    }
    res.json({
        courses: courses,
    });
}));
router.put("/courses/:courseId", auth_1.authenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const updatedCourse = req.body;
    const course = yield db_1.Course.findOneAndUpdate({ _id: courseId, adminId: req.headers.adminId }, updatedCourse);
    if (course) {
        console.log("Inside course");
        res.json({
            course,
        });
    }
    else {
        res.status(404).json({
            message: "Course not found",
        });
    }
}));
exports.default = router;
