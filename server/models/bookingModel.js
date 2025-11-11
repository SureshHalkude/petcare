import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serviceName: { type: String, required: true },
    serviceType: { type: String, required: true },
    servicePrice: { type: String, required: true },
    status: { type: String, default: "Pending" },
    bookedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
