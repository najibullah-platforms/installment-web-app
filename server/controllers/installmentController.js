import Installment from "../models/Installment.js";

// Create a new installment
export const createInstallment = async (req, res) => {
  try {
    const { clientName, totalAmount } = req.body;
    const userId = req.user.id;

    const installment = await Installment.create({
      userId,
      clientName,
      totalAmount,
      remainingAmount: totalAmount,
    });

    res.status(201).json(installment);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Fetch all user installments
export const getInstallments = async (req, res) => {
  try {
    const userId = req.user.id;
    const installments = await Installment.find({ userId }).sort({ createdAt: -1 });
    res.json(installments);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Add a payment to an installment
export const addPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const installment = await Installment.findById(id);
    if (!installment) return res.status(404).json({ msg: "Installment not found" });

    installment.paidAmount += Number(amount);
    installment.remainingAmount = installment.totalAmount - installment.paidAmount;
    installment.payments.push({ amount });

    await installment.save();
    res.json(installment);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
