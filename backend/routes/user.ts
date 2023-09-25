import { Course, Users } from "../db/db";
import express from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { authenticateAdmin } from "../authentication/auth";
import mongoose from "mongoose";

const router = express.Router();
const secret = String(process.env.JWT_SECRET);

const signProps = z.object({
  username: z.string().min(5),
  password: z.string().min(3),
});

router.post("/signup", async (req, res) => {
  try {
    const userDetails = signProps.safeParse(req.body);
    if (!userDetails.success) {
      return res.status(411).json({
        error: userDetails.error,
      });
    }

    const { username, password } = userDetails.data;
    const user = await Users.findOne({
      username: username,
      password: password,
    });
    if (user) {
      res.status(403).json({
        message: "User already exists",
      });
      return;
    }
    const cart: String[] = [];
    const newUser = new Users({ username, password, cart });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: "24h" });
    return res.json({
      message: "User signed up successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.post("/signin", async (req, res) => {
  const userDetails = signProps.safeParse(req.body);
  if (!userDetails.success) {
    return res.send(403).json({
      message: "Invalid username or password",
    });
  }

  const { username, password } = userDetails.data;
  const isUserPresent = await Users.findOne({ username, password });
  if (isUserPresent) {
    const token = jwt.sign({ id: isUserPresent._id }, secret, {
      expiresIn: "24h",
    });
    return res.json({
      message: "User signed in successfully",
      token,
    });
  } else {
    return res.status(403).json({
      message: "Invalid username or password",
    });
  }
});

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find({});
    return res.json({
      courses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.get("/courses/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findOne({ _id: courseId });
    res.json({
      course,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.post("/cart/:courseId", authenticateAdmin, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.headers.adminId;
    const user = await Users.findById(userId);
    if (user) {
      const id = new mongoose.Types.ObjectId(courseId);
      if (user.cart.includes(id)) {
        res.status(403).json({
          message: "Course already present",
        });
        return;
      }
      user.cart.push(id);
      await user.save();
      res.json({
        message: "Course added to cart",
      });
    }
  } catch (e) {
    res.status(404).json({
      error: "Course not found",
    });
  }
});

router.patch("/cart/remove/:courseId", authenticateAdmin, async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.headers.adminId;
        const user = await Users.findById(userId);
        if (user) {
        const id = new mongoose.Types.ObjectId(courseId);
        if (!user.cart.includes(id)) {
            res.status(403).json({
            message: "Course not present",
            });
            return;
        }
        user.cart = user.cart.filter((course) => !course.equals(id));
        await user.save();
        res.json({
            message: "Course removed from cart",
        });
        }
    } catch (e) {
        res.status(404).json({
        error: "Course not found",
        });
    }
});

export default router;
