import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import path from "path";
const __dirname = path.resolve();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to db"));

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
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

app.get("*", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../../../Project/Fullstack/hotelBookingApp/client/dist/index.html"
    )
  );
});

app.listen(8000, () => console.log(`Server running on port ${8000}`));
