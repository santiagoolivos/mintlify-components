"use client";

import type React from "react";

type IconType =
	| "regular"
	| "solid"
	| "light"
	| "thin"
	| "sharp-solid"
	| "duotone"
	| "brands";

interface IconProps {
	icon: string; // e.g. "check"
	iconType?: IconType; // default to "solid"
	color?: string; // hex code, e.g. "#FF5733"
	size?: number; // px, e.g. 32
}

export function Icon({
	icon,
	iconType = "solid",
	color = "#000000",
	size = 16,
}: IconProps) {
	// Build the URL based on iconType & icon
	// e.g., "https://mintlify.b-cdn.net/v6.6.0/thin/check.svg"
	const cdnBase = "https://mintlify.b-cdn.net/v6.6.0";
	const iconUrl = `${cdnBase}/${iconType}/${icon}.svg`;

	const style: React.CSSProperties = {
		maskImage: `url("${iconUrl}")`,
		maskRepeat: "no-repeat",
		maskPosition: "center center",
		backgroundColor: color,
		width: `${size}px`,
		height: `${size}px`,
		display: "inline-block",
		verticalAlign: "text-bottom",
	};

	return <svg className="inline" style={style} />;
}
