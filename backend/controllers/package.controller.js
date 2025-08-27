// controllers/package.controller.js
import { v2 as cloudinary } from "cloudinary";
import prisma from "../utils/prisma.js";

export const createNewPackage = async (req, res) => {
  try {
    const {
      destination,
      description,
      location,
      hotelName,
      hotelType,
      difficulty,
      features,
      price,
      duration,
      peopleCount,
      roomsCount,
      complementaryBreakfast,
      pickAndDrop,
    } = req.body;

    // Ensure file exists
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    // Convert buffer to base64 for Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: "image",
      folder: "travel_packages",
    });

    // Parse features if it's a string
    let featuresArray = [];
    if (typeof features === "string") {
      featuresArray = JSON.parse(features);
    } else if (Array.isArray(features)) {
      featuresArray = features;
    }

    // Parse boolean values
    const hasComplementaryBreakfast = complementaryBreakfast === "true";
    const hasPickAndDrop = pickAndDrop === "true";

    const newPackage = await prisma.package.create({
      data: {
        imageUrl: result.secure_url,
        destination,
        description,
        location,
        hotelName,
        hotelType,
        difficulty,
        price: parseFloat(price),
        duration: parseInt(duration),
        peopleCount: parseInt(peopleCount),
        roomsCount: parseInt(roomsCount),
        complementaryBreakfast: hasComplementaryBreakfast,
        pickAndDrop: hasPickAndDrop,
        features: featuresArray,
      },
    });

    res.status(201).json({ success: true, package: newPackage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllPackages = async (_, res) => {
  try {
    const packages = await prisma.package.findMany();

    res.status(200).json({ success: true, packages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;

    // Extract fields from the form data
    const {
      destination,
      description,
      location,
      hotelName,
      hotelType,
      difficulty,
      features,
      price,
      duration,
      peopleCount,
      roomsCount,
      complementaryBreakfast,
      pickAndDrop,
    } = req.body;

    let updateData = {};

    // Only add fields to updateData if they are provided and not undefined
    if (destination !== undefined) updateData.destination = destination;
    if (description !== undefined) updateData.description = description;
    if (location !== undefined) updateData.location = location;
    if (hotelName !== undefined) updateData.hotelName = hotelName;
    if (hotelType !== undefined) updateData.hotelType = hotelType;
    if (difficulty !== undefined) updateData.difficulty = difficulty;

    // Handle numeric fields
    if (price !== undefined && price !== "")
      updateData.price = parseFloat(price);
    if (duration !== undefined && duration !== "")
      updateData.duration = parseInt(duration);
    if (peopleCount !== undefined && peopleCount !== "")
      updateData.peopleCount = parseInt(peopleCount);
    if (roomsCount !== undefined && roomsCount !== "")
      updateData.roomsCount = parseInt(roomsCount);

    // Parse boolean values
    if (complementaryBreakfast !== undefined) {
      updateData.complementaryBreakfast = complementaryBreakfast === "true";
    }

    if (pickAndDrop !== undefined) {
      updateData.pickAndDrop = pickAndDrop === "true";
    }

    // Parse features if provided
    if (features) {
      let featuresArray = [];
      if (typeof features === "string") {
        try {
          featuresArray = JSON.parse(features);
        } catch (error) {
          console.log("Error parsing features:", error);
          featuresArray = features.split(","); // Fallback: try splitting by comma
        }
      } else if (Array.isArray(features)) {
        featuresArray = features;
      }
      updateData.features = featuresArray;
    }

    // Handle image upload if a new image is provided
    if (req.file) {
      // Convert buffer to base64 for Cloudinary
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        resource_type: "image",
        folder: "travel_packages",
      });

      updateData.imageUrl = result.secure_url;
    }

    const updatedPackage = await prisma.package.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json({ success: true, package: updatedPackage });
  } catch (error) {
    console.log("Update error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPackageDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Package ID is required" });
    }

    const packageDetails = await prisma.package.findUnique({
      where: { id },
    });
    res.status(200).json({ success: true, package: packageDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.package.delete({
      where: { id },
    });

    res
      .status(200)
      .json({ success: true, message: "Package deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
