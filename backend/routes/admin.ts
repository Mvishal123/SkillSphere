import { Admin, Course } from "../db/db";
import express from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { authenticateAdmin } from "../authentication/auth";

const router = express.Router();
const secret = String(process.env.JWT_SECRET);

const signProps = z.object({
  username: z.string().max(20),
  password: z.string(),
});

// const courseProps = z.object({
// title: z.string(),        //do it later
//   description: z.string()
// })

router.get("/me", authenticateAdmin, (req, res) => {
  res.json({
    id: req.headers.adminId,
  });
});
router.post("/signup", async (req, res) => {
  const inputs = signProps.safeParse(req.body);
  if (!inputs.success) {
    res.status(411).json({
      error: inputs.error,
    });
    return;
  }
  const username = inputs.data.username;
  const password = inputs.data.password;

  const isAdmin = await Admin.findOne({ username, password });
  if (!isAdmin) {
    const type = "admin";
    const adminData = { username, password, type };
    const newAdmin = await new Admin(adminData);
    await newAdmin.save();

    const token = jwt.sign({ id: newAdmin._id }, secret, { expiresIn: "6h" });

    res.json({
      msg: "Admin signed in successfully",
      token,
    });
  } else {
    res.status(409).json({ message: "Admin already present. Try signing in" });
  }
});

router.post("/signin", async (req, res) => {
  const inputs = signProps.safeParse(req.body);
  if (!inputs.success) {
    res.status(411).json({
      error: inputs.error,
    });
    return;
  }
  const username = inputs.data.username;
  const password = inputs.data.password;

  const admin = await Admin.findOne({ username, password });
  if (!admin) {
    res.status(404).json({ message: "Admin not found. Sign in first" });
    return;
  }
  const token = jwt.sign({ id: admin._id }, secret, { expiresIn: "6h" });
  res.json({ message: "Signed in successfully", token });
});

router.post("/courses", authenticateAdmin, async (req, res) => {
  const courses = await Course.find({});
  let { title, description, price, image, teacher } = req.body;
  if (typeof image === "undefined") {
    image =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp_f_9Q54YeTLXDwRAy_xciq9s4MLAgU4G7g&usqp=CAU";
  }
  const adminId = req.headers.adminId;
  console.log("ADMIN", adminId);

  const course = new Course({
    title: title,
    description: description,
    price: price,
    image: image,
    teacher: teacher,
    adminId: adminId,
  });
  await course.save();

  res.json({ message: "Course added successfully", courses: course });
});

router.get("/courses", authenticateAdmin, async (req, res) => {
  const courses = await Course.find({ adminId: req.headers.adminId });
  if (!courses) {
    res.status(404).json({
      msg: "Courses not found",
    });
    return;
  }
  res.json({
    courses: courses,
  });
});

router.get("/courses/:courseId", authenticateAdmin, async(req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findOne({_id: courseId, adminId: req.headers.adminId});
  if(!course){
    res.status(404).json({
      message: "Course not found"
    })
    return;
  }
  res.json({
    course
  })

})

router.put("/courses/:courseId", authenticateAdmin, async (req, res) => {
  const courseId = req.params.courseId;
  const updatedCourse = req.body;
  const course = await Course.findOneAndUpdate(
    { _id: courseId, adminId: req.headers.adminId },
    updatedCourse
  );
  if (course) {
    console.log("Inside course");

    res.json({
      course,
    });
  } else {
    res.status(404).json({
      message: "Course not found",
    });
  }
});


export default router;
