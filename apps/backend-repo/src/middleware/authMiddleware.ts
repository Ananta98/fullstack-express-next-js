import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).send({ error: "Unauthorized: No token provided" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req["currentuser"] = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: "Unauthorized: Invalid token" });
  }
};
