import express, { Request, Response, NextFunction } from "express";
import {
  GetVandorProfile,
  UpdateVandorProfile,
  UpdateVandorService,
  VandorLogin,
} from "../controllers";
import { verifyToken } from "../middlewares";

const router = express.Router();

router.post("/login", VandorLogin);
router.get("/profile", verifyToken, GetVandorProfile);
router.patch("/profile", UpdateVandorProfile);
router.patch("/service", UpdateVandorService);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json("Vandor route");
});

export { router as VandorRoute };
