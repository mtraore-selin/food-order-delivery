import express, { Request, Response, NextFunction } from "express";
import multer from "multer";

import {
  AddFood,
  GetFoods,
  GetVandorProfile,
  UpdateVandorCoverImage,
  UpdateVandorProfile,
  UpdateVandorService,
  VandorLogin,
} from "../controllers";
import { verifyToken } from "../middlewares";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

// Initialiser multer avec les options de stockage
const upload = multer({ storage }).array("images", 10);

router.post("/login", VandorLogin);
router.get("/profile", verifyToken, GetVandorProfile);
router.patch("/profile", verifyToken, UpdateVandorProfile);
router.patch("/coverimage", verifyToken, upload, UpdateVandorCoverImage);
router.patch("/service", verifyToken, UpdateVandorService);

router.post("/food", verifyToken, upload, AddFood);
router.get("/foods", verifyToken, GetFoods);

export { router as VandorRoute };
