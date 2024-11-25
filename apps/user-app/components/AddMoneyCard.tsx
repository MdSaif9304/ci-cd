"use client";

import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/CreateOnRampTransactions";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState<number>(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  return (
    <>
      <div className="border p-2 bg-white rounded">
        <Card title="Add Money" />
        <div className="w-full">
          <TextInput
            label={"Amount"}
            placeholder={"Amount"}
            onChange={(value           
            ) => {
              setAmount(Number(value));
            }}
          />
          <div className="mb-2 mt-2">Bank</div>
          <Select
            onSelect={(value) => {
              setRedirectUrl(
                SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
              setProvider(
                SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
            }}
            options={SUPPORTED_BANKS.map(x => ({
              key: x.name,
              value: x.name,
            }))}/>
          <div className="flex justify-center pt-4 ">
            <button
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 
              focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 
              dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={async () => {
                await createOnRampTransaction(amount * 100, provider)
                window.location.href = redirectUrl || ""
              }}>
              Add Money
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
