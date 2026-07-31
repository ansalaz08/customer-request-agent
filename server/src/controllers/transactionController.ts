import { Request, Response } from "express";
import { processTransactions } from "../services/transactionService";

export function uploadTransactions(req: Request, res: Response) {
  const { transactions } = req.body;

  const result = processTransactions(transactions);

  return res.json(result);
}