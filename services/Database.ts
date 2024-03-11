import mongoose from "mongoose";

import { MONGO_URI } from "../config";

export default async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Mongoose Connected");
  } catch (error) {
    console.log("Mongoose connection error", error);
  }
};
