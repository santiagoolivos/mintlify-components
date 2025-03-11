"use client";

import type { ReactNode } from "react";

export interface TabProps {
	title: string; // e.g. "First Tab"
	children: ReactNode; // The content to show if this tab is active
}

export interface InternalTabProps extends TabProps {
	// We'll add these internal props so <Tabs> can control the rendering
	isActive?: boolean; // whether this tab is the currently active one
	onTabClick?: () => void; // called when user clicks the tab button
	renderMode?: "button" | "content"; // Are we rendering the button row or the content area?
}

/**
 * The <Tab> component that can render EITHER:
 * - the tab button (renderMode="button")
 * - the tab content (renderMode="content")
 */
export function Tab({
	title,
	children,
	isActive = false,
	onTabClick,
	renderMode,
}: InternalTabProps) {
	if (!renderMode) {
		return (
			<>
				<button
					className={`
              flex text-sm leading-6 font-semibold whitespace-nowrap
              pt-3 pb-2.5 -mb-px max-w-max border-b border-current
              ${
								isActive
									? // Active styling
										"text-primary dark:text-primary-light "
									: // Inactive styling
										"text-gray-900 border-transparent hover:border-gray-300 dark:text-gray-200 dark:hover:border-gray-700"
							}
            `}
					role="tab"
					aria-selected={isActive}
					tabIndex={isActive ? 0 : -1}
					onClick={onTabClick}
				>
					{title}
				</button>
				<div className="prose dark:prose-dark overflow-x-auto" role="tabpanel">
					<p>{children}</p>
				</div>
			</>
		);
	} else if (renderMode === "button") {
		// We're rendering the tab button row
		return (
			<li className="cursor-pointer" role="presentation">
				<button
					className={`
            flex text-sm leading-6 font-semibold whitespace-nowrap
            pt-3 pb-2.5 -mb-px max-w-max border-b
            ${
							isActive
								? // Active styling
									"text-primary dark:text-primary-light border-current"
								: // Inactive styling
									"text-gray-900 border-transparent hover:border-gray-300 dark:text-gray-200 dark:hover:border-gray-700"
						}
          `}
					role="tab"
					aria-selected={isActive}
					tabIndex={isActive ? 0 : -1}
					onClick={onTabClick}
				>
					{title}
				</button>
			</li>
		);
	} else {
		// We're rendering the tab content area
		return isActive ? (
			<div className="prose dark:prose-dark overflow-x-auto" role="tabpanel">
				<p>{children}</p>
			</div>
		) : null;
	}
}
