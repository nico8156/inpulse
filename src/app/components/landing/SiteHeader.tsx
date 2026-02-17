"use client";

import { InPulseIcon } from "@/app/components/InPulseIcon";
import type { SectionId } from "@/app/components/landing/landingConfig";

export default function SiteHeader(props: {
	headerHidden: boolean;
	activeId: SectionId;
	onNav: (id: SectionId) => void;
	onCta: () => void;
}) {
	const { headerHidden, activeId, onNav, onCta } = props;

	return (
		<header
			className={[
				"fixed top-3 left-0 right-0 z-50 transition-all duration-200",
				headerHidden ? "opacity-0 -translate-y-2 pointer-events-none" : "opacity-100 translate-y-0",
			].join(" ")}
		>
			<div className="mx-auto max-w-6xl px-6">
				<div className="rounded-2xl border border-white/35 bg-white/55 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.10)]">
					<div className="flex items-center justify-between px-4 py-3">
						{/* BRAND */}
						<button
							onClick={() => onNav("hero")}
							className="flex items-center gap-3"
							aria-label="Retour à l’accueil"
						>
							<div className="h-9 w-9 rounded-full bg-white/70 backdrop-blur-xl flex items-center justify-center">
								<InPulseIcon size={120} />
							</div>

							<div className="leading-tight text-left">
								<div className="text-sm font-semibold tracking-tight text-zinc-950">inPulse</div>
								<div className="text-xs font-medium text-zinc-700">capteur de ressenti</div>
							</div>
						</button>

						{/* NAV */}
						<nav className="hidden md:flex items-center gap-5 text-sm text-zinc-700">
							<NavBtn label="Hero" active={activeId === "hero"} onClick={() => onNav("hero")} />
							<NavBtn label="Demo" active={activeId === "demo"} onClick={() => onNav("demo")} />
							<NavBtn label="Principes" active={activeId === "principes"} onClick={() => onNav("principes")} />
							<NavBtn label="Comment" active={activeId === "comment"} onClick={() => onNav("comment")} />
							<NavBtn label="Booking" active={activeId === "booking"} onClick={() => onNav("booking")} />
						</nav>

						{/* CTA */}
						<button
							onClick={onCta}
							className="rounded-full bg-zinc-950 px-4 py-2 text-xs font-medium text-white hover:bg-zinc-900"
						>
							Demander un inPulse
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}

function NavBtn(props: { label: string; active: boolean; onClick: () => void }) {
	return (
		<button
			onClick={props.onClick}
			className={[
				"relative px-1 py-1 transition",
				props.active ? "text-zinc-950" : "hover:text-zinc-950",
			].join(" ")}
		>
			{props.label}
			<span
				className={[
					"absolute left-0 right-0 -bottom-1 mx-auto h-[2px] w-4 rounded-full transition-opacity",
					props.active ? "opacity-100 bg-zinc-900/70" : "opacity-0 bg-zinc-900/50",
				].join(" ")}
			/>
		</button>
	);
}

