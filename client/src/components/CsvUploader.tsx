import Papa from "papaparse";
import { type Transaction } from "../types/transaction";
import { useState } from "react";
import { submitTransaction } from "../services/api";

interface Props {
  onTransactionsLoaded: (transactions: Transaction[]) => void;
}

export default function CsvUploader({
  onTransactionsLoaded,
}: Props) {
  const [error, setError] = useState("");

const handleFileUpload = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (!file) return;

  if (!file.name.endsWith(".csv")) {
    setError("Please upload a CSV file.");
    return;
  }

  Papa.parse<Transaction>(file, {
    header: true,
    skipEmptyLines: true,

    complete: async (results) => {
      const requiredColumns = [
        "date",
        "vendor",
        "amount",
      ];

      const headers = results.meta.fields ?? [];

      const missingColumns = requiredColumns.filter(
        (column) => !headers.includes(column)
      );

      if (missingColumns.length > 0) {
        setError(
          `Missing required columns: ${missingColumns.join(", ")}`
        );
        return;
      }

      const transactions = results.data;

      await submitTransaction(transactions);

      onTransactionsLoaded(transactions);
    },

    error: (error) => {
      console.error(error);
      setError("Failed to parse CSV.");
    },
  });
};

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />

      {error && <p>{error}</p>}
    </div>
  );
}