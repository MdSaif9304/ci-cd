import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db";
import { OnRampTransactions } from "../../../components/OnRampTransactions";

async function getBalance() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      throw new Error("User session not found.");
    }

    const balance = await prisma.balance.findFirst({
      where: {
        userId: Number(session.user.id),
      },
    });

    return {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0,
    };
  } catch (error) {
    console.error("Error fetching balance:", error);
    return { amount: 0, locked: 0 }; // Fallback in case of error
  }
}

async function getOnRampTransaction() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      throw new Error("User session not found.");
    }

    const txns = await prisma.onRampTransaction.findMany({
      where: {
        userId: Number(session.user.id),
      },
    });

    return txns.map((t) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    }));
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return []; 
  }
}

export default async function AddMoneyPage() {
  try {
    const balance = await getBalance();
    const transactions = await getOnRampTransaction();
    return (
      <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-4 pl-4 font-semibold">
          Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
          <div>
            <AddMoney />
          </div>
          <div className="">
            <div>
              <BalanceCard amount={balance.amount} locked={balance.locked} />
            </div>
            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    );
  } catch (error: any) {
    return (
      <div className="w-screen text-center">
        <h1 className="text-4xl text-red-600 pt-8 mb-4 font-semibold">
          Error Loading Balance
        </h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
