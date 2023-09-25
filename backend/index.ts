import express from 'express';
import dotenv from "dotenv";
import adminRouter from "./routes/admin";
import userRouter from "./routes/user";
import cors from "cors";
import {connect} from "./db/db"

dotenv.config();
const app = express();
const port = 3000;


app.use(express.json())
app.use(cors());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

connect(); //connect to database

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


