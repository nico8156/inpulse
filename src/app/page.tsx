"use client";

import SiteBackground from "@/app/components/landing/SiteBackground";
import SiteHeader from "@/app/components/landing/SiteHeader";
import { SECTION_IDS, type SectionId } from "@/app/components/landing/landingConfig";
import BookingSection from "@/app/components/landing/sections/BookingSection";
import CommentSection from "@/app/components/landing/sections/CommentSection";
import DemoSection from "@/app/components/landing/sections/DemoSection";
import HeroSection from "@/app/components/landing/sections/HeroSection";
import PrincipesSection from "@/app/components/landing/sections/PrincipesSection";
import { useEffect, useRef, useState } from "react";

function scrollToId(id: SectionId) {
	const el = document.getElementById(id);
	if (!el) return;
	el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HomePage() {
	const mainRef = useRef<HTMLElement | null>(null);
	const [activeId, setActiveId] = useState<SectionId>("hero");

	// Header hidden ONLY on section 2
	const headerHidden = activeId === "demo";

	useEffect(() => {
		const root = mainRef.current;
		if (!root) return;

		const sections = SECTION_IDS
			.map((id) => document.getElementById(id))
			.filter(Boolean) as HTMLElement[];

		const obs = new IntersectionObserver(
			(entries) => {
				let best: { id: SectionId; ratio: number } | null = null;

				for (const e of entries) {
					const id = e.target.id as SectionId;
					if (!SECTION_IDS.includes(id)) continue;
					if (!best || e.intersectionRatio > best.ratio) best = { id, ratio: e.intersectionRatio };
				}

				if (best && best.ratio >= 0.6) setActiveId(best.id);
			},
			{
				root,
				rootMargin: "0px 0px -10% 0px",
				threshold: [0.5, 0.6, 0.75, 0.9],
			}
		);

		sections.forEach((s) => obs.observe(s));
		return () => obs.disconnect();
	}, []);

	return (
		<main
			ref={(el) => {
				mainRef.current = el;
			}}
			className="relative h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth overscroll-contain"
		>
			<SiteBackground />

			<SiteHeader
				headerHidden={headerHidden}
				activeId={activeId}
				onNav={(id) => scrollToId(id)}
				onCta={() => scrollToId("booking")}
			/>

			<HeroSection onPrimary={() => scrollToId("demo")} onSecondary={() => scrollToId("principes")} />
			<DemoSection />
			<PrincipesSection />
			<CommentSection />
			<BookingSection />
		</main>
	);
}
