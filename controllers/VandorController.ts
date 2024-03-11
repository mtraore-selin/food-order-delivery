import { NextFunction, Request, Response } from "express";

import { CreateFoodInput, LoginVandorInput, UpdateVandorInput } from "../dto";
import { Vandor } from "../models";
import {
  ComparePassword,
  GenerateSignature,
} from "../utility/PasswordGenerate";
import { Food } from "../models/Food";

const getVandorFromDecodedId = async (req: Request, res: Response) => {
  const vandorId = (req as any)?.decoded?._id;

  if (!vandorId) {
    res.status(401).json({ message: "Unauthorized" });
  }

  const vandor = await Vandor.findById(vandorId);

  if (!vandor) {
    res.status(404).json({ message: "Vandor not found" });
  }

  return vandor;
};

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

    const passwordMatch = await ComparePassword(password, vandor.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

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
    const vandor = await getVandorFromDecodedId(req, res);

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
) => {
  try {
    const vandor = (await getVandorFromDecodedId(req, res))!;

    const updateData: UpdateVandorInput = req.body;

    vandor.name = updateData.name || vandor.name;
    vandor.foodType = updateData.foodType || vandor.foodType;
    vandor.address = updateData.address || vandor.address;
    vandor.phone = updateData.phone || vandor.phone;

    await vandor.save();

    res.status(200).json({ message: "Success", data: vandor });
  } catch (error) {
    console.error("Failed to update vandor profile:", error);
    next(error);
  }
};

export const UpdateVandorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vandor = (await getVandorFromDecodedId(req, res))!;

    const { serviceAvailable } = req.body;

    vandor.serviceAvailable = serviceAvailable;

    await vandor.save();

    res.status(200).json({ message: "Success", data: vandor });
  } catch (error) {
    console.error("Failed to update vandor service:", error);
    next(error);
  }
};

export const AddFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vandor = (await getVandorFromDecodedId(req, res))!;

    const { name, description, foodType, category, readyTime, price } =
      req.body as CreateFoodInput;
    const files = req.files as [Express.Multer.File];
    const images = files.map((f: Express.Multer.File) => f.filename);

    const createdFood = await Food.create({
      vandorId: vandor._id,
      name,
      description,
      images,
      foodType,
      category,
      readyTime,
      price,
      rating: 0,
    });
    vandor.foods.push(createdFood);

    await vandor.save();

    res.status(200).json({ message: "Success", data: vandor });
  } catch (error) {
    console.error("Failed to update vandor service:", error);
    next(error);
  }
};

export const UpdateVandorCoverImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vandor = (await getVandorFromDecodedId(req, res))!;

    const files = req.files as [Express.Multer.File];

    if (!files?.length) {
      return res.status(400).json({ message: "Image is required" });
    }

    const images = files?.map((f: Express.Multer.File) => f.filename);

    vandor.coverImages.push(...images);

    await vandor.save();

    res.status(200).json({ message: "Success", data: vandor });
  } catch (error) {
    console.error("Failed to update vandor service:", error);
    next(error);
  }
};

export const GetFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vandor = await getVandorFromDecodedId(req, res);

    const foods = await Food.find({ vandorId: vandor?._id });

    res.status(200).json({ message: "Success", data: foods });
  } catch (error) {
    console.error("Failed to get vandor profile:", error);
    next(error);
  }
};
