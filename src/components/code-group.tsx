"use client";

import React, { useState } from "react";
import { CodeBlock } from "./code-block";
import { CopyToClipboardButton } from "./copy"; // your existing copy component

export interface CodeSnippet {
	filename: string;
	content: string;
	language?: string;
	highlightLines?: string;
	isExpandable?: boolean; // pass along to CodeBlock
	initialCollapsedHeight?: number; // pass along to CodeBlock
}

interface CodeGroupProps {
	codeSnippets: CodeSnippet[];
	defaultIndex?: number;
}

/**
 * CodeGroup: a tabbed interface where each tab is a "CodeBlock"
 * with the same functionalities (highlight lines, expand/collapse, etc.).
 * The group header shows tabs for each filename + a single copy button.
 */
export function CodeGroup({ codeSnippets, defaultIndex = 0 }: CodeGroupProps) {
	const [activeIndex, setActiveIndex] = useState(defaultIndex);

	if (!codeSnippets.length) return null;

	// The snippet that is currently active
	const currentSnippet = codeSnippets[activeIndex];

	return (
		<div
			className="
        mt-5 mb-8 flex flex-col not-prose relative 
        rounded-2xl dark:border-gray-800/50 bg-[#0F1117] border border-transparent 
        dark:bg-codeblock text-gray-50 codeblock-dark
      "
		>
			{/* Tabs header */}
			<div className=" rounded-2xl relative border-b border-gray-900/80 bg-[#0F1117] dark:bg-codeblock">
				{/* Tab list */}
				<div
					className="
            text-xs leading-6 rounded-t-xl flex overflow-x-auto 
            overflow-y-hidden mr-12 scrollbar-thin scrollbar-thumb-rounded 
            scrollbar-thumb-white/20 dark:scrollbar-thumb-white/20 
            hover:scrollbar-thumb-white/25 dark:hover:scrollbar-thumb-white/25 
            active:scrollbar-thumb-white/25 dark:active:scrollbar-thumb-white/25
          "
					role="tablist"
					aria-orientation="horizontal"
				>
					{codeSnippets.map((snippet, i) => {
						const isActive = i === activeIndex;
						return (
							<button
								key={snippet.filename}
								className={`
                  group flex items-center relative px-2 pt-2.5 pb-2 outline-none 
                  whitespace-nowrap font-medium
                  ${isActive ? "text-primary-light" : "text-gray-400"}
                `}
								role="tab"
								type="button"
								aria-selected={isActive}
								tabIndex={isActive ? 0 : -1}
								onClick={() => setActiveIndex(i)}
							>
								<div
									className="
                    px-2 rounded-lg z-10 
                    // group-hover:bg-gray-700/60 group-hover:text-primary-light
                  "
								>
									{snippet.filename}
								</div>
								{/* active tab bottom border */}
								{isActive && (
									<div
										className="
                      absolute inset-0 border-b pointer-events-none 
                      border-primary dark:border-primary-light
                    "
									/>
								)}
							</button>
						);
					})}
				</div>

				{/* Single copy button in top-right corner */}
				<div className="flex h-full absolute top-0 pr-4 right-0 rounded-tr z-10">
					<div className="flex items-center justify-center h-[42px]">
						<div className="z-10 relative">
							<CopyToClipboardButton
								textToCopy={currentSnippet.content}
								data-testid="copy-code-button"
								aria-label="Copy the contents from the code block"
								className="
                  group/copy-button
                  h-7 w-7 flex items-center justify-center 
                  rounded-md backdrop-blur peer 
                "
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Single tab panel: the active snippet rendered as a CodeBlock */}
			<div className="flex flex-1 overflow-hidden">
				<div
					className="
            relative min-w-full w-full transition-[height] 
            duration-300 ease-in-out
          "
					role="tabpanel"
					tabIndex={0}
					aria-labelledby={currentSnippet.filename}
					style={{ fontVariantLigatures: "none", height: "auto" }}
				>
					<div
						className="
              flex-none overflow-x-auto text-sm h-full 
              scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-white/20 
              dark:scrollbar-thumb-white/20 hover:scrollbar-thumb-white/25 
              dark:hover:scrollbar-thumb-white/25 active:scrollbar-thumb-white/25 
              dark:active:scrollbar-thumb-white/25 leading-6
            "
					>
						<CodeBlock
							// We hide the header inside the group
							hideHeader
							content={currentSnippet.content}
							language={currentSnippet.language}
							highlightLines={currentSnippet.highlightLines}
							isExpandable={currentSnippet.isExpandable}
							initialCollapsedHeight={currentSnippet.initialCollapsedHeight}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
