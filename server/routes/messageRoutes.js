import express from "express";
import { sendMessage } from "../controllers/messageController.js";

const router = express.Router();

// POST: /api/messages/contact
router.post("/contact", sendMessage);

export default router;
