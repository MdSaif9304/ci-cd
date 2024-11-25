import { Card } from "@repo/ui/card";

export const RecenTransaction = ({
  p2pTransactions,
}: {
  p2pTransactions: {
    time: Date;
    amount: number;
    fromUser: string;
  }[];
}) => {
  return (
    <div className="border p-4 bg-white min-w-96">
      <div className="text-xl font-semibold">
        <Card title="Recent Transactions" />
      </div>
      <div className="pt-2">
        {p2pTransactions.map((t) => (
          <div className="flex justify-between">
            <div className="flex flex-col justify-center">{t.fromUser}</div>
            <div className="flex flex-col justify-center">{t.amount}</div>
            <div>{new Date(t.time).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
