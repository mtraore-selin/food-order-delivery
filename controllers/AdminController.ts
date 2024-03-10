import { NextFunction, Request, Response } from "express";
import { CreateVandorInput } from "../dto/Vandor.dto";
import { Vandor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const CreateVandor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      ownerName,
      foodType,
      pincode,
      address,
      email,
      password,
      phone,
    } = req.body as CreateVandorInput;

    // encrypt password
    const salt = await GenerateSalt();
    const passwordHashed = await GeneratePassword(password, salt);

    const newVandor = {
      name,
      ownerName,
      foodType,
      pincode,
      address,
      email,
      password: passwordHashed,
      phone,
      salt,
      rating: 0,
      serviceAvailable: false,
      coverImages: [],
    };

    const createdVandor = await Vandor.create(newVandor);

    res.status(201).json({
      message: "Vandor successfully created",
      data: createdVandor,
    });
  } catch (error) {
    console.error("Failed to create vandor:", error);
    next(error);
  }
};

export const GetVandors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vandors = await Vandor.find({});

    res.status(200).json({ message: "Success", data: vandors });
  } catch (error) {
    console.error("Failed to get vandors:", error);

    next(error);
  }
};

export const GetVandorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vandorId = req.params.id;

    const vandor = await Vandor.findById(vandorId);

    if (!vandor) {
      return res.status(404).json({ message: "Vandor not found" });
    }

    res.status(200).json({ message: "Success", data: vandor });
  } catch (error) {
    console.error("Failed to get vandor by ID:", error);
    next(error);
  }
};
