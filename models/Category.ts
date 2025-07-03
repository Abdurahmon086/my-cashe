import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: false },
});

export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);