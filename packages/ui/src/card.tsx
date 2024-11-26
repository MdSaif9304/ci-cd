import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}):JSX.Element {
  return (
    <div className="border-b pb-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
