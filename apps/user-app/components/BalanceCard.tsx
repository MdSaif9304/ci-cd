import { Card } from "@repo/ui/card";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <div className="border p-2 bg-white">
      <Card title="Balance" />
      <div className="flex justify-between align-items-center border-b border-slate-300 pb-3 pt-3">
        Unlocked Balance
      <div>{amount / 100} INR</div>
      </div>
      <div className="flex justify-between align-items-center border-b border-slate-300 pb-3 pt-3">
        Total Locked Balance
      <div>{locked / 100} INR</div>
      </div>
      <div className="flex justify-between align-items-center border-b border-slate-300 pb-3 pt-3">
        Total Balance
      <div>{(locked + amount) / 100} INR</div>
      </div>
    </div>
  );
};
