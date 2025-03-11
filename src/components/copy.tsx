import { clsx } from "clsx";
import {
	type ComponentPropsWithoutRef,
	type ReactNode,
	useEffect,
	useState,
} from "react";
import {
	type CopyToClipboardResult,
	copyToClipboard,
} from "../utils/copy-to-clipboard";

export function CopyToClipboardButton({
	textToCopy,
	tooltipColor = "#002937",
	onCopied,
	className,
	...props
}: {
	textToCopy: string;
	tooltipColor?: string;
	onCopied?: (result: CopyToClipboardResult, textToCopy?: string) => void;
} & ComponentPropsWithoutRef<"button">) {
	const [hidden, setHidden] = useState(true);
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		// Hide copy button if the browser does not support it
		if (typeof window !== "undefined" && !navigator?.clipboard) {
			console.warn(
				"The browser's Clipboard API is unavailable. The Clipboard API is only available on HTTPS.",
			);
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, []);

	// Hide copy button if you would copy an empty string
	if (!textToCopy || disabled) {
		return null;
	}

	return (
		<button
			aria-label={"Copy code to clipboard"}
			onClick={async () => {
				const result = await copyToClipboard(textToCopy);
				if (onCopied) {
					onCopied(result, textToCopy);
				}
				if (result === "success") {
					setHidden(false);
					setTimeout(() => {
						setHidden(true);
					}, 2000);
				}
			}}
			className={clsx("group", className)}
			{...props}
		>
			<svg
				className="top-5 h-[1rem] bg-slate-500 hover:bg-slate-300 cursor-pointer"
				style={{
					maskImage:
						'url("https://mintlify.b-cdn.net/v6.6.0/solid/copy.svg")',
					maskRepeat: "no-repeat",
					maskPosition: "center center",
				}}
			>
			</svg>
			<Tooltip
				color={tooltipColor}
				className={`${hidden ? "invisible" : undefined} group-hover:visible`}
			>
				{hidden ? "Copy" : "Copied"}
			</Tooltip>
		</button>
	);
}
function Tooltip({
	color,
	className,
	children,
}: {
	color: string;
	className?: string;
	children: ReactNode;
}) {
	return (
		<div
			className={clsx(
				"z-40 absolute bottom-full left-1/2 mb-3.5 pb-1 -translate-x-1/2",
				className,
			)}
		>
			<div
				className={`relative whitespace-nowrap text-white text-xs leading-6 font-medium px-1.5 rounded-lg`}
				style={{ background: color }}
				data-reach-alert="true"
			>
				{children}
				<div
					className={`absolute border-solid`}
					style={{
						top: "100%",
						left: "50%",
						marginLeft: "-6px",
						borderWidth: "6px",
						borderColor: `${color} transparent transparent transparent`,
					}}
				/>
			</div>
		</div>
	);
}
