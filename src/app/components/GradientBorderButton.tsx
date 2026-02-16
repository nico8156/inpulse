"use client";

import React from "react";

export function GradientBorderButton(props: {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	href?: string;
	variant?: "dark" | "light";
	type?: "button" | "submit";
	fullWidth?: boolean;
}) {
	const isLight = props.variant === "light";

	const innerBg = isLight ? "#ffffff" : "#09090b";
	const textColor = isLight ? "#09090b" : "#ffffff";

	const widthClass = props.fullWidth ? "w-full" : "";

	const style = {
		// CSS variables consumed by .ip-border-btn
		["--ip-inner" as any]: innerBg,
		["--ip-text" as any]: textColor,
	} as React.CSSProperties;

	const content = (
		<span className={["ip-border-btn", widthClass, props.className ?? ""].join(" ")} style={style}>
			<span className={["ip-border-btn__inner", widthClass].join(" ")}>
				{props.children}
			</span>
		</span>
	);

	if (props.href) {
		return (
			<a href={props.href} onClick={props.onClick} className={["inline-flex", widthClass].join(" ")}>
				{content}
			</a>
		);
	}

	return (
		<button type={props.type ?? "button"} onClick={props.onClick} className={["inline-flex", widthClass].join(" ")}>
			{content}
		</button>
	);
}
