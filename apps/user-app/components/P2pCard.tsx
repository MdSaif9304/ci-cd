"use client";

import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { useState } from "react";

export const P2pCard = () => {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <div className="border p-4 bg-white rounded min-w-72">
      <Card title={"Send Money"} />
      <div className="w-full">
        <div className="mb-2">
          <TextInput placeholder="Number" label="Number" onChange={(value) => {
            setNumber(value)
          }} />
        </div>
        <div className="mb-4">
          <TextInput placeholder="Amount" label="Amount" onChange={(value) => {
            setAmount(value)
          }} />
        </div>
        <button
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 
              focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 
              dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={async () => {
            await p2pTransfer(number, Number(amount) * 100)
          }}
        >
          Send Money
        </button>
      </div>
    </div>
  );
};
