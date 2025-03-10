"use client";

import { FC, ReactNode } from "react";

interface CardGroupProps {
  children: ReactNode;
  cols?: number; // Number of columns per row (default: 2)
}

const CardGroup: FC<CardGroupProps> = ({ children, cols = 2}) => {

  const className = `not-prose grid gap-x-4 sm:grid-cols-${cols}`;
  return (
    <div
      className={className}
    >
      {children}
    </div>
  );
};

export default CardGroup;
