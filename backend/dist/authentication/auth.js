"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateAdmin = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const key = String(process.env.JWT_KEY);
        jsonwebtoken_1.default.verify(token, key, (err, data) => {
            if (err) {
                res.sendStatus(401).json({
                    message: "Unauthorized access",
                });
            }
            else {
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
    }
    else {
        res.sendStatus(404).json({
            message: "Header info not found",
        });
    }
};
exports.authenticateAdmin = authenticateAdmin;
