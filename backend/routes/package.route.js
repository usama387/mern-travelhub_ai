import express from "express";
import upload from "../utils/multer.js";
import { 
  createNewPackage, 
  getAllPackages, 
  updatePackage,
  deletePackage, 
  getPackageDetails
} from "../controllers/package.controller.js";

const packageRouter = express.Router();

packageRouter.post("/create", upload.single("image"), createNewPackage);
packageRouter.get("/getPackages", getAllPackages);
packageRouter.put("/update/:id", upload.single("image"), updatePackage);
packageRouter.get("/get/:id", getPackageDetails);
packageRouter.delete("/delete/:id", deletePackage);

export default packageRouter;