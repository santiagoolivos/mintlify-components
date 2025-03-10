"use client";

import { FC, ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface CardProps {
  title: string;
  icon?: string | IconDefinition;
  iconType?: "regular" | "solid" | "light" | "thin" | "sharp-solid" | "duotone" | "brands";
  color?: string; // this will be an hex code
  href?: string;
  horizontal?: boolean;
  img?: string;
  children: ReactNode;
}

const Card: FC<CardProps> = ({ title, icon, iconType = "regular", color, href, horizontal = false, img, children }) => {
  // FontAwesome icon prefix mapping

  // Card container classes
  const cardClass = `card block not-prose font-normal group relative my-2 ring-2 ring-transparent rounded-2xl bg-white dark:bg-background-dark 
                     border border-gray-950/10 dark:border-white/10 overflow-hidden w-full cursor-pointer 
                     hover:!border-primary dark:hover:!border-primary-light`;

  // Card content layout
  const cardContentClass = `px-6 py-5 relative ${horizontal ? "flex items-center gap-x-3" : ""}`;

  // Card content (text & icons)
  const cardContent = (
    <div className={cardContentClass}>
      {/* Top-right arrow icon (if href exists) */}
      {href && (
        <div className="absolute text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary-light top-5 right-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-up-right w-4 h-4"
          >
            <path d="M7 7h10v10"></path>
            <path d="M7 17 17 7"></path>
          </svg>
        </div>
      )}

      {/* Icon */}
      {icon && (
          <div className="h-4 w-4 fill-gray-800 dark:fill-gray-100 text-gray-800 dark:text-gray-100">
            <svg 
                className="w-4 h-4 bg-gray-800 dark:bg-gray-100"
                style={{
                  maskImage: `url("https://mintlify.b-cdn.net/v6.6.0/${iconType}/${icon}.svg")`,
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  backgroundColor: color ? color : "transparent",
                }}
            ></svg>
          </div>
        )}

      {/* Title & Text Content */}
      <div>
        <h2 className={`font-semibold text-base text-gray-800 dark:text-white ${!horizontal ? "mt-4" : ""}`}>{title}</h2>
        <div className={`font-normal text-sm text-gray-600 dark:text-gray-400 leading-6 ${!horizontal ? "mt-1" : ""}`}>
          <p>{children}</p>
        </div>
      </div>
    </div>
  );

  // Card wrapper (anchor if href exists)
  return href ? (
    <a href={href} className={cardClass}>
      {img && <img src={img} alt={title} className="w-full object-cover object-center" />}
      {cardContent}
    </a>
  ) : (
    <div className={cardClass}>
      {img && <img src={img} alt={title} className="w-full object-cover object-center" />}
      {cardContent}
    </div>
  );
};

export default Card;
