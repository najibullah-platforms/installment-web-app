import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createInstallment, getInstallments, addPayment } from "../controllers/installmentController.js";

const router = express.Router();

router.post("/", verifyToken, createInstallment);
router.get("/", verifyToken, getInstallments);
router.post("/:id/pay", verifyToken, addPayment);

export default router;
