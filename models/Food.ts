import mongoose, { Document, Schema } from "mongoose";

interface FoodDoc extends Document {
  vandorId: string;
  name: string;
  description: string;
  category: string;
  foodType: string;
  readyTime: number;
  price: number;
  rating: number;
  images: string[];
}

const FoodSchema = new Schema(
  {
    vandorId: { type: Schema.Types.ObjectId, required: true, ref: "vandor" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    foodType: { type: String, required: true },
    readyTime: { type: Number, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    images: [{ type: String }],
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

// If necessary, index fields that are frequently queried or searched.
FoodSchema.index({ vandorId: 1, category: 1, foodType: 1 });

const Food = mongoose.model<FoodDoc>("food", FoodSchema);

export { Food };
