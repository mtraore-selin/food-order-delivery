import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, APP_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    (req as any).decoded = decoded;
    next();
  });
};
