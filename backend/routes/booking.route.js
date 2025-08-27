import express from "express";
import { cancelUserBooking, createBooking, getUserBookings, updateBookingStatus } from "../controllers/booking.controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/create/:userId" ,createBooking)
bookingRouter.get("/get-bookings/:userId" ,getUserBookings)
bookingRouter.put("/bookings/:userId/:bookingId/cancel", cancelUserBooking);
bookingRouter.put("/bookings/:bookingId/status", updateBookingStatus);


export default bookingRouter;
