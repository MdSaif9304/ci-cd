"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if(!from) {
        return {
            msg: "Error while sending money"
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if(!toUser) {
        return {
            msg: "User not found"
        }
    }

    await prisma.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

        const fromBalance = await tx.balance.findUnique({
            where: {
                userId: Number(from)
            }
        });
        console.log("above sleep")
        await new Promise(resolve => setTimeout(resolve, 4000))
        console.log("after sleep")
        if(!fromBalance || fromBalance.amount < amount) {
            throw new Error("Insufficient Balance")
        }

        await tx.balance.update({
            where: {
                userId: Number(from)
            },
            data: {
                amount: {
                    decrement: amount
                }
            }
        });

        await tx.balance.update({
            where: {
                userId: toUser.id
            },
            data: {
                amount: {
                    increment: amount
                }
            }
        });

        await tx.p2pTransfer.create({
            data: {
                fromUserId: Number(from),
                amount,
                toUserId: toUser.id,
                timeStamp: new Date()
            }
        })
    })
}