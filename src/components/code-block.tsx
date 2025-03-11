import Prism from "prismjs";
import { useEffect, useState } from "react";
// import "prismjs/themes/prism-c.css";
import "prism-themes/themes/prism-coldark-dark.css";
import { CopyToClipboardButton } from "./copy";

interface CodeBlockProps {
	title?: string;
	content: string; // Raw (un-highlighted) code
	language?: string; // e.g. "javascript", "java", "python"
	highlightLines?: string; // e.g. "1,3-5"
	initialCollapsedHeight?: number; // e.g. 100 (px)
	isExpandable?: boolean; // If true, show expand/collapse overlay
	hideHeader?: boolean; // If true, don't render title or copy button
}

export function CodeBlock({
	title = "Code Block Example",
	content,
	language = "javascript",
	highlightLines,
	initialCollapsedHeight = 100,
	isExpandable = false,
	hideHeader = false,
}: CodeBlockProps) {
	const [expanded, setExpanded] = useState(false);
	const [htmlCode, setHtmlCode] = useState("");

	// Parse highlightLines (e.g., "1,3-5") into a set of line numbers
	const parseHighlightLines = (lineSpec: string): Set<number> => {
		const linesToHighlight = new Set<number>();
		lineSpec.split(",").forEach((chunk) => {
			if (chunk.includes("-")) {
				const [start, end] = chunk
					.split("-")
					.map((n) => Number.parseInt(n, 10));
				for (let i = start; i <= end; i++) {
					linesToHighlight.add(i);
				}
			} else {
				linesToHighlight.add(Number.parseInt(chunk, 10));
			}
		});
		return linesToHighlight;
	};

	useEffect(() => {
		// If no line highlighting, just highlight entire content
		if (!highlightLines) {
			const highlighted = Prism.highlight(
				content,
				Prism.languages[language] || Prism.languages.javascript,
				language,
			);
			setHtmlCode(highlighted);
			return;
		}

		// Otherwise, highlight line-by-line
		const highlightSet = parseHighlightLines(highlightLines);
		const rawLines = content.split("\n");

		const processedLines = rawLines.map((line, index) => {
			const lineNumber = index + 1;
			const lineHtml = Prism.highlight(
				line,
				Prism.languages[language] || Prism.languages.javascript,
				language,
			);
			if (highlightSet.has(lineNumber)) {
				// Wrap in .line-highlight if it's a highlighted line
				return `<span class="line-highlight">${lineHtml}</span>`;
			}
			// Add a newline only if not the last line
			return lineHtml + (index < rawLines.length - 1 ? "\n" : "");
		});

		setHtmlCode(processedLines.join(""));
	}, [content, language, highlightLines]);

	// If not expandable, we treat it as always expanded
	const effectiveExpanded = isExpandable ? expanded : true;

	return (
		<div
			className={`
        ${!hideHeader && "mt-5 mb-8"} not-prose rounded-2xl relative 
        text-gray-50 bg-[#0F1117] dark:bg-codeblock 
        ring-1 ring-transparent dark:ring-gray-800/50 codeblock-dark`}
		>
			{/* Header: Title & CopyToClipboard (unless hideHeader is true) */}
			{!hideHeader && (
				<div
					className="
            flex rounded-t-2xl text-gray-400 text-xs leading-6 
            border-b font-medium bg-black/40 border-gray-900/80
          "
				>
					<div
						className="
              flex-none border-b px-4 pt-2.5 pb-2 
              flex items-center text-primary-light border-primary-light
            "
					>
						{title}
					</div>

					<div className="flex-1 mr-4 flex items-center justify-end">
						<div className="z-10 relative">
							<CopyToClipboardButton
								textToCopy={content}
								data-testid="copy-code-button"
								aria-label="Copy the contents from the code block"
								tooltipColor="#002937"
								className="
                  group/copy-button
                  h-7 w-7 flex items-center justify-center 
                  rounded-md backdrop-blur
                "
							/>
						</div>
					</div>
				</div>
			)}

			{/* Code Content */}
			<div
				className="
          min-w-full relative text-sm leading-6 p-5
          children:!my-0 children:!shadow-none children:!bg-transparent
          transition-[height] duration-300 ease-in-out
        "
				style={{
					fontVariantLigatures: "none",
					height: effectiveExpanded ? "auto" : `${initialCollapsedHeight}px`,
				}}
			>
				<div
					className="
            overflow-x-auto h-full
            [&>pre>code]:pr-[3rem]
            [&>pre>code>span.line-highlight]:min-w-[calc(100%+3rem)]
            overflow-y-hidden scrollbar-thin scrollbar-thumb-rounded 
            scrollbar-thumb-white/20 dark:scrollbar-thumb-white/20 
            hover:scrollbar-thumb-white/25 dark:hover:scrollbar-thumb-white/25 
            active:scrollbar-thumb-white/25 dark:active:scrollbar-thumb-white/25
          "
				>
					<pre>
						<code
							className={`language-${language}`}
							dangerouslySetInnerHTML={{ __html: htmlCode }}
						/>
					</pre>
				</div>

				{/* Expand/Collapse: Only if isExpandable === true */}
				{isExpandable && !effectiveExpanded && (
					<div
						className="
              absolute left-0 z-[10] right-0 flex justify-center items-end
              rounded-2xl h-full top-0 bg-transparent
              bg-gradient-to-b from-transparent to-black/80
            "
					>
						<button
							className="
                flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm 
                backdrop-blur-sm bg-white/20 text-white mb-8
              "
							onClick={() => setExpanded(true)}
						>
							<svg
								style={{
									maskImage: `url("https://mintlify.b-cdn.net/v6.6.0/solid/arrow-down.svg")`,
									maskRepeat: "no-repeat",
									maskPosition: "center",
								}}
								className=" w-3 h-3 bg-white transition-transform duration-400"
							></svg>
							Expand code
						</button>
					</div>
				)}

				{isExpandable && effectiveExpanded && (
					<div className="flex justify-center pt-2 pb-4">
						<button
							className="
                flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm
                backdrop-blur-sm bg-white/20 text-white
              "
							onClick={() => setExpanded(false)}
						>
							<svg
								style={{
									maskImage: `url("https://mintlify.b-cdn.net/v6.6.0/solid/arrow-up.svg")`,
									maskRepeat: "no-repeat",
									maskPosition: "center",
								}}
								className=" w-3 h-3 bg-white transition-transform duration-400"
							></svg>
							Collapse code
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
