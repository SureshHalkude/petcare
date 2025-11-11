import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAllBookings,
  updateBookingStatus,
    deleteBooking,
} from "../controllers/adminController.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// 🟢 Verify Admin Middleware
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin")
      return res.status(403).json({ success: false, message: "Admin access required" });

    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// Routes
router.post("/signup", registerAdmin); // optional – can disable later
router.post("/login", loginAdmin);
router.get("/bookings", verifyAdmin, getAllBookings);
router.patch("/bookings/:id", verifyAdmin, updateBookingStatus);

router.delete("/bookings/:id", verifyAdmin, deleteBooking);


export default router;
