import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    provider: string;
    status: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <div>
        <Card title="Recent Transactions" />
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </div>
    );
  }
  return (
    <div className="bg-white mt-2 p-2">
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm font-semi-bold">Received INR</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
    </div>
  );
};
