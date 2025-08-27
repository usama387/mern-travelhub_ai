import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToCloudinary from "./utils/Cloudinary.js";
import packageRouter from "./routes/package.route.js";
import bookingRouter from "./routes/booking.route.js";

// App Config
const app = express();

// cloudinary setup
connectToCloudinary();

// to access environment variables in .env file
dotenv.config();

// middlewares
app.use(express.json());

// cors policy
app.use(cors())

// package api end point
app.use("/api/package", packageRouter);

//booking api end point
app.use("/api/booking", bookingRouter);

// test api end point
app.get("/", (_, res) => {
  res.send("Travel Hub backend server is up successfully...");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`The backend is up on port ${port}`);
});
