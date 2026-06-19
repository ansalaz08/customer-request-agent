import { type Transaction } from "../types/transaction";

interface Props {
  transactions: Transaction[];
}

export default function TransactionTable({
  transactions,
}: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Vendor</th>
          <th>Amount</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td>{transaction.date}</td>
            <td>{transaction.vendor}</td>
            <td>{transaction.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}