import prisma from "../utils/prisma.js";

export const createBooking = async (req, res) => {
  try {
    const {
      packageId,
      persons,
      checkIn,
      checkOut,
      transportation,
      hotel,
      totalPrice,
    } = req.body;

    const { userId } = req.params;

    // fields validation
    const missingFields = [];
    if (!userId) missingFields.push("userId");
    if (!packageId) missingFields.push("packageId");
    if (!persons) missingFields.push("persons");
    if (!checkIn) missingFields.push("checkIn");
    if (!checkOut) missingFields.push("checkOut");
    if (!transportation) missingFields.push("transportation");
    if (!hotel) missingFields.push("hotel");
    if (!totalPrice) missingFields.push("totalPrice");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const packageExists = await prisma.package.findUnique({
      where: {
        id: packageId,
      },
    });

    if (!packageExists) {
      return res
        .status(404)
        .json({ success: false, message: "Package not found" });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId,
        packageId,
        persons,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        transportation,
        hotel: hotel.toUpperCase(),
        totalPrice,
        status: "PENDING",
      },
    });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId,
      },
      include: {
        package: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const cancelUserBooking = async (req, res) => {
  try {
    const { userId, bookingId } = req.params;

    if (!userId || !bookingId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and Booking ID are required" });
    }

    // Find booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // Ensure the booking belongs to the user
    if (booking.userId !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to cancel this booking" });
    }

    // Update status to CANCELLED
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED" },
    });

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Cancel Booking Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!bookingId || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Booking ID and status are required" });
    }

    if (!["CONFIRMED", "CANCELLED"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status. Must be CONFIRMED or CANCELLED" });
    }

    // Find booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // Update status
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Update Booking Status Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

