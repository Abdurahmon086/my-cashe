import mongoose, { Schema } from "mongoose";

const ExpenseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  type: { type: String, default: "expense" },
});

export default mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
