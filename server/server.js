// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/messages", messageRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

