"use client";

import React from "react";
import Link from "next/link";

type StyleWithVars = React.CSSProperties & {
	[key: `--${string}`]: string | number;
};

type CommonProps = {
	children: React.ReactNode;
	className?: string;
	variant?: "dark" | "light";
	fullWidth?: boolean;
};

type ButtonProps = CommonProps &
	Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
		href?: undefined;
		type?: "button" | "submit" | "reset";
	};

type AnchorProps = CommonProps &
	Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "type" | "href"> & {
		href: string;
		type?: never;
	};

function isAnchorProps(p: ButtonProps | AnchorProps): p is AnchorProps {
	return "href" in p && typeof p.href === "string";
}

export function GradientBorderButton(props: ButtonProps | AnchorProps) {
	const isLight = props.variant === "light";

	const innerBg = isLight ? "#ffffff" : "#09090b";
	const textColor = isLight ? "#09090b" : "#ffffff";

	const widthClass = props.fullWidth ? "w-full" : "";

	const style: StyleWithVars = {
		"--ip-inner": innerBg,
		"--ip-text": textColor,
	};

	const content = (
		<span
			className={["ip-border-btn", widthClass, props.className ?? ""].join(" ")}
			style={style}
		>
			<span className={["ip-border-btn__inner", widthClass].join(" ")}>
				{props.children}
			</span>
		</span>
	);

	if (isAnchorProps(props)) {
		const { href, ...anchorRest } = props;

		const isExternal =
			href.startsWith("http://") ||
			href.startsWith("https://") ||
			href.startsWith("mailto:") ||
			href.startsWith("tel:");

		// On ne propage PAS les props custom vers <a>
		const { className: _c, children: _ch, variant: _v, fullWidth: _fw, ...aProps } = anchorRest;

		if (isExternal) {
			return (
				<a href={href} className={["inline-flex", widthClass].join(" ")} {...aProps}>
					{content}
				</a>
			);
		}

		return (
			<Link href={href} className={["inline-flex", widthClass].join(" ")}>
				{content}
			</Link>
		);
	}

	// Ici TS sait que c'est ButtonProps
	const { type, ...buttonRest } = props;
	const { className: _c, children: _ch, variant: _v, fullWidth: _fw, ...bProps } = buttonRest;

	return (
		<button
			type={type ?? "button"}
			className={["inline-flex", widthClass].join(" ")}
			{...bProps}
		>
			{content}
		</button>
	);
}
