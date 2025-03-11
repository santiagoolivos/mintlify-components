"use client";

import type React from "react";
import { useState } from "react";

interface TooltipProps {
	tip: string; // The text that appears in the tooltip
	children: React.ReactNode; // The text or element you hover over
}

export function Tooltip({ tip, children }: TooltipProps) {
	const [isOpen, setIsOpen] = useState(false);

	// For a more advanced approach, you could use a popper library (like @floating-ui/react)
	// to auto-position the tooltip. Here, we do a simple absolute placement.

	return (
		<div className="relative inline-block">
			{/* Trigger Button */}
			<button
				data-state={isOpen ? "instant-open" : "closed"}
				// Show tooltip on hover/focus, hide on leave/blur
				onMouseEnter={() => setIsOpen(true)}
				onMouseLeave={() => setIsOpen(false)}
				onFocus={() => setIsOpen(true)}
				onBlur={() => setIsOpen(false)}
				className="outline-none"
				aria-describedby="tooltip-content"
			>
				{/* Underlined text */}
				<span className="underline decoration-dotted decoration-2 underline-offset-4 decoration-gray-400 dark:decoration-gray-500">
					{children}
				</span>
			</button>

			{/* Tooltip Content (conditionally shown) */}
			{isOpen && (
				<div
					// For advanced popper logic, we'd dynamically set `left/top/transform`.
					// Here, we do a naive approach to place the tooltip above the trigger.
					className="
            absolute z-50 bg-tooltip text-gray-50
            text-xs px-1.5 py-1 rounded-lg border border-gray-50 dark:border-gray-500
            max-w-[16rem] text-center w-max
          "
					style={{
						// Position it above & centered
						bottom: "100%",
						left: "50%",
						transform: "translateX(-50%) translateY(-0.2rem)",
					}}
					id="tooltip-content"
					role="tooltip"
				>
					{tip}
				</div>
			)}
		</div>
	);
}
