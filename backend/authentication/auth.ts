import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { string } from "zod";

export const authenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const key = String(process.env.JWT_KEY);
    jwt.verify(token, key, (err, data) => {
      if (err) {
        res.sendStatus(401).json({
          message: "Unauthorized access",
        });
      } else {
        if (!data) {
          res.sendStatus(404).json({
            message: "data not found",
          });
        }
        if (typeof data === "string") {
          res.sendStatus(404);
        }
        if (typeof data === "object") {
          // console.log(data.id);
          
          req.headers["adminId"] = data.id;
          // console.log("verified");
          next();
        }
      }
    });
  } else {
    res.sendStatus(404).json({
      message: "Header info not found",
    });
  }
};
