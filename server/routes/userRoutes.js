import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
const router = express.Router();

// Route for signup (user registration)
router.post("/signup", registerUser);

// Route for login (user authentication)
router.post("/login", loginUser);

export default router;
