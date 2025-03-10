"use client";

import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Or your preferred dark Prism theme
import { CopyToClipboardButton } from "./copy";

// ---- Import the two new components ----

interface CodeBlockProps {
  title?: string;
  content: string;            // Raw, un-highlighted code
  language?: string;          // e.g. "javascript", "java", "python"
  highlightLines?: string;    // e.g. "1,3-5"
  initialCollapsedHeight?: number; // e.g. 100 (px)
}

export function CodeBlock({
  title = "Code Block Example",
  content,
  language = "javascript",
  highlightLines,
  initialCollapsedHeight = 100,
}: CodeBlockProps) {
  const [expanded, setExpanded] = useState(false);
  const [htmlCode, setHtmlCode] = useState("");

  /**
   * Parse highlightLines (e.g., "1,3-5") into a set of 1-based line numbers
   * that should have the "line-highlight" class.
   */
  const parseHighlightLines = (lineSpec: string): Set<number> => {
    const linesToHighlight = new Set<number>();
    lineSpec.split(",").forEach((chunk) => {
      if (chunk.includes("-")) {
        // Range (e.g. "3-5")
        const [start, end] = chunk.split("-").map((n) => parseInt(n, 10));
        for (let i = start; i <= end; i++) {
          linesToHighlight.add(i);
        }
      } else {
        // Single line
        linesToHighlight.add(parseInt(chunk, 10));
      }
    });
    return linesToHighlight;
  };

  useEffect(() => {
    // No line highlighting: highlight entire code at once
    console.log("content", highlightLines);
    if (!highlightLines) {
      const highlighted = Prism.highlight(
        content,
        Prism.languages[language] || Prism.languages.javascript,
        language
      );
      setHtmlCode(highlighted);
      return;
    }

    // With line highlighting: highlight each line separately
    const highlightSet = parseHighlightLines(highlightLines);
    console.log("highlightSet", highlightSet);
    const rawLines = content.split("\n");

    const processedLines = rawLines.map((line, index) => {
      const lineHtml = Prism.highlight(
        line,
        Prism.languages[language] || Prism.languages.javascript,
        language
      );
      // If line is in the highlight set, wrap in <span class="line-highlight">
      const lineNumber = index + 1;
      if (highlightSet.has(lineNumber)) {
        return `<span class="line-highlight">${lineHtml}</span>`;
      }
      // Only add a newline if the line is not highlighted
      return lineHtml + (index < rawLines.length - 1 ? "\n" : "");
    });
    console.log("processedLines", processedLines);
    setHtmlCode(processedLines.join(""));
  }, [content, language, highlightLines]);

  return (
    <div
      className="
        mt-5 mb-8 not-prose rounded-2xl relative 
        text-gray-50 bg-[#0F1117] dark:bg-codeblock 
        ring-1 ring-transparent dark:ring-gray-800/50 codeblock-dark
      "
    >
      {/* Header: Title & CopyToClipboardButton */}
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
            {/* 
              Use the new CopyToClipboardButton
              - textToCopy={content} 
              - pass "data-testid" or "aria-label" if you like
              - optionally set a custom tooltipColor 
            */}
            <CopyToClipboardButton
              data-testid="copy-code-button"
              aria-label="Copy the contents from the code block"
              textToCopy={content}
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

      {/* Code Content */}
      <div
        className="
          min-w-full relative text-sm leading-6
          children:!my-0 children:!shadow-none children:!bg-transparent
          transition-[height] duration-300 ease-in-out
        "
        style={{
          fontVariantLigatures: "none",
          height: expanded ? "auto" : `${initialCollapsedHeight}px`,
        }}
      >
        <div
          className="
            overflow-x-auto h-full p-5
            [&>pre>code]:pr-[3rem]
            [&>pre>code>span.line-highlight]:min-w-[calc(100%+3rem)]
            overflow-y-hidden scrollbar-thin scrollbar-thumb-rounded 
            scrollbar-thumb-white/20 dark:scrollbar-thumb-white/20 
            hover:scrollbar-thumb-white/25 dark:hover:scrollbar-thumb-white/25 
            active:scrollbar-thumb-white/25 dark:active:scrollbar-thumb-white/25
          "
        >
          <pre >
            <code
              className={`language-${language}`}
              dangerouslySetInnerHTML={{ __html: htmlCode }}
            />
          </pre>
        </div>

        {/* Expand / Collapse Overlay */}
        {!expanded ? (
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
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-down size-3 transition-transform duration-400"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
              Expand code
            </button>
          </div>
        ) : (
          <div className="flex justify-center pt-2 pb-4">
            <button
              className="
                flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm
                backdrop-blur-sm bg-white/20 text-white
              "
              onClick={() => setExpanded(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-up size-3 transition-transform duration-400"
              >
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </svg>
              Collapse code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
