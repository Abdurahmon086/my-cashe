import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  category: mongoose.Types.ObjectId;
  description?: string;
  date: Date;
}

const ExpenseSchema = new Schema<IExpense>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, 
  description: { type: String },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema);
