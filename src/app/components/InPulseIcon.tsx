import Image from "next/image";

export function InPulseIcon(props: {
	size?: number; // px
	className?: string;
	priority?: boolean;
}) {
	const size = props.size ?? 36;

	return (
		<Image
			src="/inpulse-icon.png"
			alt="inPulse icon"
			width={size}
			height={size}
			priority={props.priority}
			className={props.className}
		/>
	);
}
