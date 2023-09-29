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
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
const secret = String(process.env.JWT_SECRET);
const signProps = zod_1.z.object({
    username: zod_1.z.string().min(5),
    password: zod_1.z.string().min(3),
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDetails = signProps.safeParse(req.body);
        if (!userDetails.success) {
            return res.status(411).json({
                error: userDetails.error,
            });
        }
        const { username, password } = userDetails.data;
        const user = yield db_1.Users.findOne({
            username: username,
            password: password,
        });
        if (user) {
            res.status(403).json({
                message: "User already exists",
            });
            return;
        }
        const cart = [];
        const newUser = new db_1.Users({ username, password, cart });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, secret, { expiresIn: "24h" });
        return res.json({
            message: "User signed up successfully",
            token,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDetails = signProps.safeParse(req.body);
    if (!userDetails.success) {
        return res.send(403).json({
            message: "Invalid username or password",
        });
    }
    const { username, password } = userDetails.data;
    const isUserPresent = yield db_1.Users.findOne({ username, password });
    if (isUserPresent) {
        const token = jsonwebtoken_1.default.sign({ id: isUserPresent._id }, secret, {
            expiresIn: "24h",
        });
        return res.json({
            message: "User signed in successfully",
            token,
        });
    }
    else {
        return res.status(403).json({
            message: "Invalid username or password",
        });
    }
}));
router.get("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield db_1.Course.find({});
        return res.json({
            courses,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}));
router.get("/courses/:courseId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        const course = yield db_1.Course.findOne({ _id: courseId });
        res.json({
            course,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}));
router.get("/cartnumber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.headers.adminId;
        const user = yield db_1.Users.findOne({ _id: userId });
        const cart = user === null || user === void 0 ? void 0 : user.cart.length;
        console.log(user === null || user === void 0 ? void 0 : user.cart);
        res.json({
            number: cart,
        });
    }
    catch (error) {
        res.json({
            error: error,
            cart: 0,
        });
    }
}));
router.post("/cart/:courseId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        const userId = req.headers.adminId;
        const user = yield db_1.Users.findById(userId);
        if (user) {
            const id = new mongoose_1.default.Types.ObjectId(courseId);
            // if (user.cart.includes(id)) {
            //   res.status(403).json({
            //     message: "Course already present",
            //   });
            //   return;
            // }
            user.cart.push(id);
            yield user.save();
            res.json({
                message: "Course added to cart",
            });
        }
    }
    catch (e) {
        res.status(404).json({
            error: "Course not found",
        });
    }
}));
router.patch("/cart/remove/:courseId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        const userId = req.headers.adminId;
        const user = yield db_1.Users.findById(userId);
        if (user) {
            const id = new mongoose_1.default.Types.ObjectId(courseId);
            if (!user.cart.includes(id)) {
                res.status(403).json({
                    message: "Course not present",
                });
                return;
            }
            user.cart = user.cart.filter((course) => !course.equals(id));
            yield user.save();
            res.json({
                message: "Course removed from cart",
            });
        }
    }
    catch (e) {
        res.status(404).json({
            error: "Course not found",
        });
    }
}));
exports.default = router;
