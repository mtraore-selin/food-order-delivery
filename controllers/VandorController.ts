import { NextFunction, Request, Response } from "express";
import { LoginVandorInput } from "../dto";
import { Vandor } from "../models";
import { ComparePassword } from "../utility/PasswordGenerate";

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
    // Vous pouvez générer un token JWT ici et le renvoyer dans la réponse
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Failed to login vandor:", error);
    next(error);
  }
};
