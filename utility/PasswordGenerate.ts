import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { VandorPayload } from "../dto";
import { APP_EXPIRE_IN, APP_SECRET } from "../config";

export const GenerateSalt = async () => bcrypt.genSalt();

export const GeneratePassword = async (password: string, salt: string) =>
  bcrypt.hash(password, salt);

export const ComparePassword = async (
  password: string,
  passwordHashed: string
) => bcrypt.compare(password, passwordHashed);

export const GenerateSignature = async (payload: VandorPayload) =>
  jwt.sign(payload, APP_SECRET, { expiresIn: APP_EXPIRE_IN });
