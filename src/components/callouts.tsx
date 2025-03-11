"use client";

import { FC, ReactNode } from "react";

interface CalloutProps {
  type: "note" | "warning" | "info" | "tip" | "check";
  children: ReactNode;
}

const calloutStyles = {
  note: "border-sky-500/20 bg-sky-50/50 dark:border-sky-500/30 dark:bg-sky-500/10 text-sky-900 dark:text-sky-200",
  warning: "border-amber-500/20 bg-amber-50/50 dark:border-amber-500/30 dark:bg-amber-500/10 text-amber-900 dark:text-amber-200",
  info: "border-zinc-500/20 bg-zinc-50/50 dark:border-zinc-500/30 dark:bg-zinc-500/10 text-zinc-900 dark:text-zinc-200",
  tip: "border-emerald-500/20 bg-emerald-50/50  dark:border-emerald-500/30 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-200",
  check: "border-emerald-500/20 bg-emerald-50/50  dark:border-emerald-500/30 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-200",
};


export const Callout: FC<CalloutProps> = ({ type, children }) => {
  let color = "gray"; 
  let calloutIcon = "";

  switch (type) {
    case "note":
      color = "bg-sky-500 dark:bg-sky-200";
      calloutIcon = "circle-exclamation";
      break;
    case "warning":
      color = "bg-amber-400 dark:bg-amber-200";
      calloutIcon = "triangle-exclamation";
      break;
    case "info":
      color = "bg-zinc-400 dark:bg-zinc-200";
      calloutIcon = "circle-info";
      break;
    case "tip":
      color = "bg-emerald-600 dark:bg-emerald-200";
      calloutIcon = "lightbulb";
      break;
    case "check":
      color = "bg-emerald-600 dark:bg-emerald-200";
      calloutIcon = "check";
      break;
  }
  
  return (
    <div className={`callout my-4 px-5 py-4 overflow-hidden rounded-2xl flex gap-3 border ${calloutStyles[type]}`}>
      <div className={`mt-0.5 w-4`}>
        <svg
          width="14" height="14"
          className={`${color}`}
          style={{
            maskImage: `url("https://mintlify.b-cdn.net/v6.6.0/solid/${calloutIcon}.svg")`,
            maskRepeat: "no-repeat",
            maskPosition: "center",
          }}
          ></svg>
      </div>
      <span className="text-sm prose min-w-0">{children}</span>
    </div>
  );
};

 
