import mongoose, { Schema, Document } from "mongoose";

export interface IIncome extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  category: string;
  description?: string;
  date: Date;
}

const IncomeSchema = new Schema<IIncome>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Income || mongoose.model<IIncome>("Income", IncomeSchema);