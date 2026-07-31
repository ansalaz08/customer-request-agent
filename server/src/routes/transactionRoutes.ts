import { Router } from "express";
import { uploadTransactions } from "../controllers/transactionController";

const router = Router();

router.post("/transactions", uploadTransactions);

export default router;