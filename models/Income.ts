import mongoose, { Schema } from "mongoose";

const IncomeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  type: { type: String, default: "income" },
});

export default mongoose.models.Income || mongoose.model("Income", IncomeSchema);
