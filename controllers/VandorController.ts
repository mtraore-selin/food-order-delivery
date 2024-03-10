import { NextFunction, Request, Response } from "express";
import { LoginVandorInput } from "../dto";
import { Vandor } from "../models";
import {
  ComparePassword,
  GenerateSignature,
} from "../utility/PasswordGenerate";

export const VandorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, email } = req.body as LoginVandorInput;
    const vandor = await Vandor.findOne({ email });

    if (!vandor) {
      return res.status(404).json({ message: "Vandor not found" });
    }

    // Vérifier si le mot de passe correspond
    const passwordMatch = await ComparePassword(password, vandor.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Le login a réussi
    const token = await GenerateSignature({
      _id: vandor._id,
      email: vandor.email,
      name: vandor.name,
      foodTypes: vandor.foodType,
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Failed to login vandor:", error);
    next(error);
  }
};

export const GetVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vandorId = (req as any)?.decoded?._id;

    if (!vandorId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const vandor = await Vandor.findById(vandorId);

    if (!vandor) {
      return res.status(404).json({ message: "Vandor not found" });
    }

    res.status(200).json({ message: "Success", data: vandor });
  } catch (error) {
    console.error("Failed to get vandor profile:", error);
    next(error);
  }
};

export const UpdateVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const UpdateVandorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
