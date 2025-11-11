import Booking from "../models/bookingModel.js";
import jwt from "jsonwebtoken";

// Middleware to verify token
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Save user info for next step
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Book a service
export const bookService = async (req, res) => {
  const { serviceName, serviceType, servicePrice } = req.body;

  try {
    const booking = await Booking.create({
      userId: req.user.id,
      serviceName,
      serviceType,
      servicePrice,
    });

    res.status(201).json({
      success: true,
      message: "Service booked successfully!",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user bookings (optional for later)
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
