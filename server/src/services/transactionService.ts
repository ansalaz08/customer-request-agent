import { RawTransaction } from "../types/rawTransaction";
import { normalizeTransaction, isValidTransaction } from "../utils/normalizeTransaction";

export function processTransactions(transactions: RawTransaction[]) {
  if (!Array.isArray(transactions)) {
    throw new Error("Transactions must be an array");
  }

  const normalizedTransactions = transactions.map(normalizeTransaction);

  const validTransactions = normalizedTransactions.filter(isValidTransaction);

  return {
    count: validTransactions.length,
    transactions: validTransactions,
  }
}