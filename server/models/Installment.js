import mongoose from "mongoose";

const InstallmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clientName: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  remainingAmount: { type: Number, required: true },
  payments: [
    {
      date: { type: Date, default: Date.now },
      amount: Number,
    },
  ],
}, { timestamps: true });

export default mongoose.model("Installment", InstallmentSchema);
