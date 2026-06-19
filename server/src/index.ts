import express from "express";
import cors from "cors";
import { isValidTransaction, normalizeTransaction } from "./utils/normalizeTransaction";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/requirements", (req, res) => {
  console.log(req.body);

  return res.json({
    message: "Requirement received",
  });
});

app.post("/api/transactions", (req, res) => {
  const { transactions } = req.body;

  if (!Array.isArray(transactions)) {
    return res.status(400).json({
      message: "Transactions must be an array",
    });
  }

  const normalizedTransactions = transactions.map(
    normalizeTransaction
  );

  const validTransactions =
    normalizedTransactions.filter(
      isValidTransaction
    );

  return res.json({
    count: validTransactions.length,
    transactions: validTransactions,
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});