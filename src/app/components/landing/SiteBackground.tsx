import Image from "next/image";

export default function SiteBackground() {
	return (
		<div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
			<Image src="/inpulse-wave.png" alt="" fill priority className="object-cover" />

			{/* wash */}
			<div className="absolute inset-0 bg-gradient-to-b from-white/86 via-white/72 to-white" />

			{/* halos (kept inside viewport to avoid horizontal scroll) */}
			<div className="absolute left-[6%] top-[10%] h-[520px] w-[520px] rounded-full bg-[hsl(var(--ip-primary)/0.10)] blur-3xl" />
			<div className="absolute right-[6%] top-[18%] h-[520px] w-[520px] rounded-full bg-[hsl(var(--ip-accent)/0.08)] blur-3xl" />
		</div>
	);
}

