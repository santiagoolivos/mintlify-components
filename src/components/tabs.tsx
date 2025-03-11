"use client";

import React, { Children, type ReactElement, useState } from "react";
import type { InternalTabProps } from "./tab";

interface TabsProps {
	children: ReactElement<InternalTabProps>[]; // multiple <Tab title="...">...</Tab>
	defaultIndex?: number;
}

/**
 * The <Tabs> container that maps over children (<Tab>),
 * then renders:
 *   1) A row of <Tab renderMode="button">
 *   2) The active <Tab> with renderMode="content"
 */
export function Tabs({ children, defaultIndex = 0 }: TabsProps) {
	const [activeIndex, setActiveIndex] = useState(defaultIndex);

	// Convert children to an array
	const tabArray = Children.toArray(
		children,
	) as ReactElement<InternalTabProps>[];
	if (tabArray.length === 0) return null;

	return (
		<div className="tabs">
			{/* (1) Render the row of tab buttons */}
			<ul
				className="
          not-prose mb-6 pb-[1px] flex-none min-w-full
          overflow-auto border-b border-gray-200 gap-x-6 flex
          dark:border-gray-200/10
        "
				role="tablist"
				aria-orientation="horizontal"
			>
				{tabArray.map((tabElement, i) => {
					// We clone each Tab but only render the "button" portion
					return React.cloneElement(tabElement, {
						key: i,
						renderMode: "button",
						isActive: i === activeIndex,
						onTabClick: () => setActiveIndex(i),
					});
				})}
			</ul>

			{/* (2) Render the active tab's content (only one) */}
			{tabArray.map((tabElement, i) => {
				// We clone each Tab again, but only the active one shows content
				return React.cloneElement(tabElement, {
					key: i + "-content",
					renderMode: "content",
					isActive: i === activeIndex,
				});
			})}
		</div>
	);
}
