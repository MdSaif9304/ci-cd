import { getServerSession } from "next-auth";
import { P2pCard } from "../../../components/P2pCard";
import { RecenTransaction } from "../../../components/RecentTransaction";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db";

async function getP2pBalance() {
    const session = await getServerSession(authOptions);
    if(!session && !session.user.id) {
        throw new Error("User session not found.");
    }

    const p2pBalance = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                {fromUserId: Number(session.user.id)},
                {toUserId: Number(session.user.id)}
            ],
        },
        orderBy: {
            timeStamp: 'desc'
        }
    });
    return p2pBalance.map((t) => ({
        time: t.timeStamp,
        amount: t.amount,
        fromUser: t.fromUserId === Number(session.user.id) ? 'You' : `User ${t.fromUserId}`
    }))
}


export default async function () {
    const p2pTransactions = await getP2pBalance();
    try {
        return (
          <div className="flex flex-col justify-center items-center h-screen w-full">
            <div className="flex gap-5">
              <P2pCard />
              <div>
                <RecenTransaction p2pTransactions={p2pTransactions}/>
              </div>
            </div>
          </div>
        );
        
    } catch (error) {
        
    }
}
