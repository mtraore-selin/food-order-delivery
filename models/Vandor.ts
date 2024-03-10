import mongoose, { Document } from "mongoose";
import { GeneratePassword, GenerateSalt } from "../utility";

interface VandorDoc extends Document {
  name: string;
  ownerName: string;
  foodType: string[];
  pincode: string;
  address: string;
  email: string;
  password: string;
  phone: string;
  salte: string;
  serviceAvailable: string;
  coverImage: string[];
  rating: number;
  //   foods: any;
}

const vandorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: { type: [String], required: true },
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: String, required: true },
    coverImages: { type: [String], required: true },
    rating: { type: Number, required: true },
    // foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "food" }],
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        // Remove sensitive fields
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

// Middleware pour hasher le mot de passe avant de sauvegarder dans la base de données
// vandorSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   const salt = await GenerateSalt();
//   this.password = await GeneratePassword(this.password, salt);
//   this.salt = salt;
//   next();
// });

const Vandor = mongoose.model<VandorDoc>("vandor", vandorSchema);

export { Vandor };
