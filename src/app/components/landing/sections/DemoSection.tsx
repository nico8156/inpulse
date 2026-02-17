"use client";

import { Choice, DemoQuestion, IphoneDemo, Step } from "@/app/components/IphoneDemo";
import React, { useEffect, useMemo, useRef, useState } from "react";

const QUESTION: DemoQuestion = {
	id: "demo-preview",
	title: "Vous êtes plutôt…",
	left: { label: "Option A", emoji: "◀︎" },
	right: { label: "Option B", emoji: "▶︎" },
};

type CopyModel = {
	eyebrow: string;
	title: string;
	subtitle: string;
	hint: string;
};

function useInView(ref: React.RefObject<HTMLElement>, opts?: { threshold?: number }) {
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const obs = new IntersectionObserver(
			([entry]) => setInView(entry.isIntersecting),
			{ threshold: opts?.threshold ?? 0.55 }
		);

		obs.observe(el);
		return () => obs.disconnect();
	}, [ref, opts?.threshold]);

	return inView;
}

/**
 * Same pattern as IphoneDemo screens
 * but opacity-only (no translate, no oscillation)
 */
function CopyLayer({
	isActive,
	mounted,
	children,
}: {
	isActive: boolean;
	mounted: boolean;
	children: React.ReactNode;
}) {
	return (
		<div
			className={[
				"absolute inset-0",
				mounted ? "ip-copy-fade" : "ip-copy-noanim",
				isActive ? "ip-copy-on" : "ip-copy-off",
				isActive ? "pointer-events-auto" : "pointer-events-none",
			].join(" ")}
		>
			{children}
		</div>
	);
}

function scrollToSiblingSection(current: HTMLElement, dir: -1 | 1) {
	const all = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
	const idx = all.findIndex((s) => s === current);
	if (idx < 0) return;

	const target = all[idx + dir];
	if (!target) return;

	target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function DemoSection() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const inView = useInView(sectionRef as React.RefObject<HTMLElement>, { threshold: 0.55 });

	const [step, setStep] = useState<Step>("landing");
	const [choice, setChoice] = useState<Choice | null>(null);

	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	useEffect(() => {
		if (step !== "processing") return;
		const t = window.setTimeout(() => {
			setChoice(null);
			setStep("landing");
		}, 1600);
		return () => window.clearTimeout(t);
	}, [step]);

	const copyByStep: Record<Step, CopyModel> = useMemo(
		() => ({
			landing: {
				eyebrow: "Demo",
				title: "Une question. Un choix.",
				subtitle: "Pas d’argumentaire. Juste un signal.",
				hint: "Touchez l’iPhone.",
			},
			question: {
				eyebrow: "Demo",
				title: "Choisissez simplement.",
				subtitle: "Deux options. Zéro justification.",
				hint: "Un tap suffit.",
			},
			bravo: {
				eyebrow: "Demo",
				title: "Signal envoyé.",
				subtitle: "Vous venez de faire un inPulse.",
				hint: "Voir le signal, ou refaire.",
			},
			processing: {
				eyebrow: "Demo",
				title: "Agrégation.",
				subtitle: "Un résultat collectif (démo).",
				hint: "Retour automatique.",
			},
		}),
		[]
	);

	const renderCopy = (k: Step) => {
		const copy = copyByStep[k];
		return (
			<div className="max-w-xl">
				<div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/12 px-3 py-1 text-[11px] text-zinc-700 ip-glass ip-glass-header">
					<span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--ip-accent)/0.65)]" />
					{copy.eyebrow}
				</div>

				<h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950">
					{copy.title}
				</h2>

				<p className="mt-2 text-base sm:text-lg text-zinc-700/90">
					{copy.subtitle}
				</p>

				<div className="mt-5 flex items-center gap-2 text-sm text-zinc-700">
					<span className="inline-flex h-7 items-center rounded-full border border-zinc-200 bg-white/70 px-3 text-[12px]">
						{copy.hint}
					</span>
				</div>
			</div>
		);
	};

	return (
		<section
			ref={sectionRef}
			id="demo"
			className="relative h-screen snap-start overflow-hidden"
			style={{ scrollSnapStop: "normal" }}
		>
			<div className="h-full flex flex-col px-6">
				<div className="h-16" />

				<div className="flex-1 flex items-center justify-center">
					<div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-10">
						{/* Left column */}
						<div className="relative">
							<div className="relative min-h-[220px] sm:min-h-[240px]">
								<CopyLayer isActive={step === "landing"} mounted={mounted}>
									{renderCopy("landing")}
								</CopyLayer>
								<CopyLayer isActive={step === "question"} mounted={mounted}>
									{renderCopy("question")}
								</CopyLayer>
								<CopyLayer isActive={step === "bravo"} mounted={mounted}>
									{renderCopy("bravo")}
								</CopyLayer>
								<CopyLayer isActive={step === "processing"} mounted={mounted}>
									{renderCopy("processing")}
								</CopyLayer>
							</div>
						</div>

						{/* Phone */}
						<div className="flex justify-center lg:justify-end">
							<div
								className={[
									"scale-[0.92] sm:scale-[0.95] transition-opacity duration-500 ease-out",
									inView ? "opacity-100" : "opacity-0",
								].join(" ")}
							>
								<IphoneDemo
									visible={inView}
									step={step}
									choice={choice}
									question={QUESTION}
									onStart={() => setStep("question")}
									onPick={(c) => {
										setChoice(c);
										setStep("bravo");
									}}
									onShowResults={() => setStep("processing")}
									onRestart={() => {
										setChoice(null);
										setStep("landing");
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="h-16" />
			</div>
		</section>
	);
}

