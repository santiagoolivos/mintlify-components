"use client";

import { ReactNode } from "react";

type TitleSize = "p" | "h2" | "h3";

export interface StepProps {
  children: ReactNode;
  icon?: string;      // e.g. "check" => "https://mintlify.b-cdn.net/v6.6.0/solid/check.svg"
  iconType?: string;  // e.g. "solid", "regular", etc.
  color?: string;     // If you want to color the icon (mask background)
  stepNumber?: number;
  title?: string;
  titleSize?: TitleSize;  // "p" | "h2" | "h3"
  isLastStep?: boolean;   // Passed internally by <Steps> to know if this is the final item
}

export function Step({
  children,
  icon,
  iconType = "solid",
  color = "#333333",
  stepNumber,
  title = "Step Title",
  titleSize = "p",
  isLastStep = false,
}: StepProps) {
  /**
   * If `icon` is provided, we’ll use mask-image to replicate Mintlify’s style.
   * Otherwise, we show the `stepNumber` in the center.
   */
  const iconUrl = icon
    ? `https://mintlify.b-cdn.net/v6.6.0/${iconType}/${icon}.svg`
    : null;

  // Use the correct background for the connecting line:
  // - for all but the last step: "bg-gray-200/70 dark:bg-white/10"
  // - for the last step: "bg-transparent bg-gradient-to-b from-gray-200 dark:from-white/10 ..."
  const connectorLineClasses = isLastStep
    ? "bg-transparent bg-gradient-to-b from-gray-200 dark:from-white/10 via-80% to-transparent"
    : "bg-gray-200/70 dark:bg-white/10";

  // We can render a dynamic title element based on titleSize
  const TitleTag = titleSize as keyof JSX.IntrinsicElements;

  return (
    <div role="listitem" className="relative flex items-start pb-2">
      {/* The vertical connector line */}
      <div
        className={`
          absolute w-px h-[calc(100%-2.75rem)] top-[2.75rem]
          ${connectorLineClasses}
        `}
      />

      {/* The circle / icon container */}
      <div className="absolute ml-[-14px] py-2">
        <div
          className="
            w-7 h-7 shrink-0 rounded-lg 
            bg-gray-100 dark:text-white dark:bg-[#26292E]
            text-sm text-gray-800 font-semibold 
            flex items-center justify-center
          "
        >
          {iconUrl ? (
            <svg
              className="h-3.5 w-3.5"
              style={{
                maskImage: `url(${iconUrl})`,
                maskRepeat: "no-repeat",
                maskPosition: "center center",
                backgroundColor: color,
              }}
            />
          ) : (
            stepNumber ?? ""
          )}
        </div>
      </div>

      {/* The main content (title + children) */}
      <div className="w-full overflow-hidden pl-12 pr-px">
      <div className="prose dark:prose-invert max-w-none">

        <TitleTag className="my-2 font-semibold 
          text-gray-900 dark:text-gray-200">{title}</TitleTag>
        <div>
          <p className="mt-5 mb-5">
          {children}
          </p>
          </div>
      </div>
    </div>
    </div>
  );
}
