import express from "express";
import { bookService, getUserBookings, verifyToken } from "../controllers/bookingController.js";

const router = express.Router();

// POST: /api/bookings/book
router.post("/book", verifyToken, bookService);

// GET: /api/bookings/my
router.get("/my", verifyToken, getUserBookings);

export default router;
