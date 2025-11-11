import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";
import Booking from "../models/bookingModel.js";

// 🟢 Admin Signup (use only once to create an admin)
export const registerAdmin = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ success: false, message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ fullName, email, password: hashedPassword });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: { id: admin._id, fullName: admin.fullName, email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🟢 Admin Login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("🧠 Login attempt with email:", email);

    const admin = await Admin.findOne({ email });
    console.log("🔍 Found admin:", admin);

    if (!admin) {
      console.log("❌ No admin found for this email.");
      return res.status(400).json({ success: false, message: "Invalid credentials (admin not found)" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("🔐 Password Match:", isMatch);

    if (!isMatch) {
      console.log("❌ Wrong password for this admin.");
      return res.status(400).json({ success: false, message: "Invalid credentials (wrong password)" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    console.log("✅ Admin login success!");

    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      token,
      admin: { id: admin._id, fullName: admin.fullName, email: admin.email },
    });
  } catch (err) {
    console.error("⚠️ Login error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🟢 Get All Bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId", "fullName email");
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🟢 Update Booking Status
export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking)
      return res.status(404).json({ success: false, message: "Booking not found" });

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: `Booking ${status} successfully`,
      booking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🗑️ Delete Booking
export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (err) {
    console.error("❌ Delete booking error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while deleting booking",
    });
  }
};

