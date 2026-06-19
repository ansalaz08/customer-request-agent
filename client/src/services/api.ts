import type { Transaction } from "../types/transaction";

export async function submitRequirement(
  requirement: string
) {
  const response = await fetch(
    "http://localhost:3001/api/requirements",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requirement }),
    }
  );

  return response.json();
}

export async function submitTransaction(transactions: Transaction[]) {
  const response = await fetch(
  "http://localhost:3001/api/transactions",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transactions,
    }),
  }
);

 return response.json();

}