"use client";

import { Choice, DemoQuestion, IphoneDemo, Step } from "@/app/components/IphoneDemo";
import React, { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

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

function useIsClient() {
	return useSyncExternalStore(
		() => () => { }, // subscribe noop
		() => true, // client snapshot
		() => false // server snapshot
	);
}

function useInView(ref: React.RefObject<HTMLElement>, opts?: { threshold?: number }) {
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
			threshold: opts?.threshold ?? 0.55,
		});

		obs.observe(el);
		return () => obs.disconnect();
	}, [ref, opts?.threshold]);

	return inView;
}

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

function PanelLayer({
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
				"absolute inset-0 flex items-center justify-center",
				mounted ? "ip-panel-fade" : "ip-panel-noanim",
				isActive ? "ip-panel-on" : "ip-panel-off",
				isActive ? "pointer-events-auto" : "pointer-events-none",
			].join(" ")}
		>
			{children}
		</div>
	);
}

type DemoMode = "demo" | "results";

export default function DemoSection() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const inView = useInView(sectionRef as React.RefObject<HTMLElement>, { threshold: 0.55 });

	// replaces mounted state + effect
	const mounted = useIsClient();

	// Key reset: when we leave the section, we remount DemoInner => state resets without useEffect setState
	const resetKey = inView ? "in" : "out";

	return (
		<section
			ref={sectionRef}
			id="demo"
			className="relative h-screen snap-start overflow-hidden"
			style={{ scrollSnapStop: "normal" }}
		>
			<DemoInner key={resetKey} inView={inView} mounted={mounted} />
		</section>
	);
}

function DemoInner({ inView, mounted }: { inView: boolean; mounted: boolean }) {
	const [mode, setMode] = useState<DemoMode>("demo");
	const [step, setStep] = useState<Step>("landing");
	const [choice, setChoice] = useState<Choice | null>(null);

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

				<h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950">{copy.title}</h2>

				<p className="mt-2 text-base sm:text-lg text-zinc-700/90">{copy.subtitle}</p>

				<div className="mt-5 flex items-center gap-2 text-sm text-zinc-700">
					<span className="inline-flex h-7 items-center rounded-full border border-zinc-200 bg-white/70 px-3 text-[12px]">
						{copy.hint}
					</span>
				</div>
			</div>
		);
	};

	return (
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
						</div>
					</div>

					{/* Right column */}
					<div className="flex justify-center lg:justify-end">
						<div className="relative w-[360px] sm:w-[400px] md:w-[420px] lg:w-[440px] h-[720px] sm:h-[780px] md:h-[820px] lg:h-[860px]">
							{/* iPhone */}
							<PanelLayer isActive={mode === "demo" && inView} mounted={mounted}>
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
									onShowResults={() => setMode("results")}
									onRestart={() => {
										setMode("demo");
										setChoice(null);
										setStep("landing");
									}}
								/>
							</PanelLayer>

							{/* Results */}
							<PanelLayer isActive={mode === "results" && inView} mounted={mounted}>
								<div className="ip-results-card">
									<div className="ip-results-card__inner flex flex-col">
										{/* Header */}
										<div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200/60">
											<div className="text-sm font-medium text-zinc-900">
												Signal <span className="text-zinc-500">(démo)</span>
											</div>
											<button
												onClick={() => {
													setMode("demo");
													setChoice(null);
													setStep("landing");
												}}
												className="text-sm text-zinc-600 hover:text-zinc-900"
											>
												Retour
											</button>
										</div>

										{/* Empty body (placeholder) */}
										<div className="flex-1 flex items-center justify-center text-sm text-zinc-500">
											Résultat collectif à venir
										</div>
									</div>
								</div>
							</PanelLayer>
						</div>
					</div>
				</div>
			</div>

			<div className="h-16" />
		</div>
	);
}
