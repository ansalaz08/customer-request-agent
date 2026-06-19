import { type RawTransaction } from "../types/rawTransaction";
import { type Transaction } from "../types/transaction";

export function normalizeTransaction(
  transaction: RawTransaction
): Transaction {
  return {
    date: normalizeDate(transaction.date),
    vendor: transaction.vendor.trim(),
    amount: Number(transaction.amount),
  };
}

function normalizeDate(date: string): string {
  const parsed = new Date(date);

  const isoDate = parsed.toISOString();

  const [normalizedDate] = isoDate.split("T");

  if (!normalizedDate) {
    throw new Error("Failed to normalize date");
  }

  return normalizedDate;
}

export function isValidTransaction(
  transaction: Transaction
): boolean {
  return (
    transaction.vendor.length > 0 &&
    !isNaN(transaction.amount) &&
    transaction.amount >= 0
  );
}