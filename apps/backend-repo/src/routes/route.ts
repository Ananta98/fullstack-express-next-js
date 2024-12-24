import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getAllUsers,
  signUpNewUser,
  updateUserData,
  updateUserById,
  signInUser,
  deleteUser,
  getProfileData,
} from "../controller/api";

const Router = express.Router();

Router.get("/fetch-user-data", authMiddleware, getAllUsers);
Router.get("/fetch-user-profile", authMiddleware, getProfileData);
Router.post("/sign-up", signUpNewUser);
Router.post("/sign-in", signInUser);
Router.put("/update-user-data", authMiddleware, updateUserData);
Router.put("/:id", authMiddleware, updateUserById);
Router.delete("/:id", authMiddleware, deleteUser);

export { Router as userRouter };
