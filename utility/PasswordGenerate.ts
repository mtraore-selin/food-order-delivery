import bcrypt from "bcrypt";

export const GenerateSalt = async () => bcrypt.genSalt();

export const GeneratePassword = async (password: string, salt: string) =>
  bcrypt.hash(password, salt);

export const ComparePassword = async (
  password: string,
  passwordHashed: string
) => bcrypt.compare(password, passwordHashed);
