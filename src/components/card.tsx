"use client";

import { FC, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

interface CardProps {
  title: string;
  icon?: string | IconDefinition;
  iconType?: "regular" | "solid" | "light" | "thin" | "sharp-solid" | "duotone" | "brands";
  color?: string;
  href?: string;
  horizontal?: boolean;
  img?: string;
  children: ReactNode;
}

const Card: FC<CardProps> = ({ title, icon, iconType = "regular", color, href, horizontal = false, img, children }) => {
  // Correctly type iconPrefix as IconPrefix
  const iconPrefix: IconPrefix = {
    regular: "far",
    solid: "fas",
    light: "fal",
    thin: "fat",
    "sharp-solid": "fass",
    duotone: "fad",
    brands: "fab",
  }[iconType] as IconPrefix; // Explicitly cast to IconPrefix

  // Card content
  const cardContent = (
    <div className={`px-6 py-5 relative ${horizontal ? "flex items-center gap-x-3" : ""}`}>
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
        <div className="h-6 w-6 fill-gray-800 dark:fill-gray-100 text-gray-800 dark:text-gray-100">
          {typeof icon === "string" ? (
            <FontAwesomeIcon icon={[iconPrefix, icon as IconName]} className="h-6 w-6" style={{ color }} />
          ) : (
            <FontAwesomeIcon icon={icon} className="h-6 w-6" style={{ color }} />
          )}
        </div>
      )}

      {/* Text content */}
      <div>
        <h2 className="font-semibold text-base text-gray-800 dark:text-white">{title}</h2>
        <div className="font-normal text-sm text-gray-600 dark:text-gray-400 leading-6 mt-0">
          <p>{children}</p>
        </div>
      </div>
    </div>
  );

  return href ? (
    <a
      href={href}
      className="card block not-prose font-normal group relative my-2 ring-2 ring-transparent rounded-2xl bg-white dark:bg-background-dark border border-gray-950/10 dark:border-white/10 overflow-hidden w-full cursor-pointer hover:!border-primary dark:hover:!border-primary-light"
    >
      {img && <img src={img} alt={title} className="w-full object-cover object-center" />}
      {cardContent}
    </a>
  ) : (
    <div className="border border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden">
      {img && <img src={img} alt={title} className="w-full object-cover object-center" />}
      {cardContent}
    </div>
  );
};

export default Card;
