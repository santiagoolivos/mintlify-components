"use client";

import { useState, ReactNode } from "react";

interface AccordionProps {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  icon?: string;
  iconType?: "regular" | "solid" | "brands";
  children: ReactNode;
}

export function Accordion({
  title,
  description,
  defaultOpen = false,
  icon,
  iconType = "solid",
  children,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);


  return (
    <div className="border border-standard rounded-2xl mb-3 overflow-hidden bg-background-light dark:bg-codeblock">
      <button
        className="relative not-prose flex items-center w-full py-4 px-5 space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-xl"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`${title}-accordion-children`}
      >
        <div id={title} className="absolute -top-[8rem]"></div>
        <div className="mr-0.5">
          <svg
            className={`h-3 w-3 transition bg-gray-700 dark:bg-gray-400 duration-200 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
            style={{
              maskImage: 'url("https://mintlify.b-cdn.net/v6.6.0/solid/caret-right.svg")',
              maskRepeat: "no-repeat",
              maskPosition: "center center",
            }}
          ></svg>
        </div>
        {icon && (
          <div className="h-4 w-4 fill-gray-800 dark:fill-gray-100 text-gray-800 dark:text-gray-100">
            <svg 
                className="w-4 h-4 bg-gray-800 dark:bg-gray-100"
                style={{
                  maskImage: `url("https://mintlify.b-cdn.net/v6.6.0/${iconType}/${icon}.svg")`,
                  maskRepeat: "no-repeat",
                  maskPosition: "center center",
                }}
            ></svg>
          </div>
        )}
        <div className="leading-tight text-left">
          <p className="m-0 font-medium text-gray-900 dark:text-gray-200">{title}</p>
          {description && (
            <p className="m-0 text-gray-900 dark:text-gray-200">{description}</p>
          )}
        </div>
      </button>
      {isOpen && (
        <div
          id={`${title}-accordion-children`}
          className="mt-2 mb-4 mx-6 overflow-x-auto"
        >
          {children}
        </div>
      )}
    </div>
  );
}
