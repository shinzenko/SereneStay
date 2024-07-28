import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import path from "path";
const __dirname = path.resolve();
import { v2 as cloudinary } from "cloudinary";
import myHotelRoutes from "./routes/my-hotels.js";
import hotelRoutes from "./routes/hotels.js";
import bookingRoutes from "./routes/my-bookings.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    console.log(
      process.env.CLOUDINARY_CLOUD_NAME,
      process.env.CLOUDINARY_API_KEY,
      process.env.CLOUDINARY_API_SECRET
    )
  );

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  express.static(
    path.join(
      __dirname,
      "../../../../Project/Fullstack/hotelBookingApp/client/dist"
    )
  )
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", bookingRoutes);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../../../Project/Fullstack/hotelBookingApp/client/dist/index.html"
    )
  );
});

app.listen(8000, () => console.log(`Server running on port ${8000}`));
