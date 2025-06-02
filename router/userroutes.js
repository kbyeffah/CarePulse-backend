import { Router } from "express";

import { getAllUsers, loginUser, registerUser, updateUser } from "../controller/usercontroller.js";
import { profilePicturesUpload } from "../middleware/upload.js";

const userRouter = Router();

// Define routes

// Register users
userRouter.post("/users/register", profilePicturesUpload.single("profilePicture"),registerUser);

// Login
userRouter.post("/users/login", loginUser);

// Update user
userRouter.patch("/users/id", updateUser);

// Get all Users
userRouter.get("/api/health-workers", getAllUsers);


export default userRouter;
