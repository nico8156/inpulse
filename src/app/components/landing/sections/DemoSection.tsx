"use client";

import { Choice, DemoQuestion, IphoneDemo, Step } from "@/app/components/IphoneDemo";
import React, { useEffect, useMemo, useState } from "react";

const QUESTION: DemoQuestion = {
	id: "demo-preview",
	title: "Vous êtes plutôt…",
	left: { label: "Option A", emoji: "◀︎" },
	right: { label: "Option B", emoji: "▶︎" },
};

export default function DemoSection() {
	const [step, setStep] = useState<Step>("landing");
	const [choice, setChoice] = useState<Choice | null>(null);

	useEffect(() => {
		if (step !== "processing") return;
		const t = window.setTimeout(() => {
			setChoice(null);
			setStep("landing");
		}, 1600);
		return () => window.clearTimeout(t);
	}, [step]);

	const microCopy = useMemo(
		() => ({
			title: "Une question. Un choix.",
			subtitle: "Pas d’argumentaire. Juste un signal.",
			hint: step === "landing" ? "Touchez l’iPhone." : "Vous pouvez refaire.",
		}),
		[step]
	);

	return (
		<section id="demo" className="h-screen snap-start [scroll-snap-stop:always] overflow-hidden">
			<div className="h-full flex flex-col px-6">
				<div className="h-16" />

				<div className="flex-1 flex items-center justify-center">
					<div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-10">
						<div className="max-w-xl">
							<div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/12 px-3 py-1 text-[11px] text-zinc-700 ip-glass ip-glass-header">
								<span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--ip-accent)/0.65)]" />
								Demo
							</div>

							<h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950">
								{microCopy.title}
							</h2>
							<p className="mt-2 text-base sm:text-lg text-zinc-700/90">
								{microCopy.subtitle}
							</p>

							<div className="mt-5 flex items-center gap-2 text-sm text-zinc-700">
								<span className="inline-flex h-7 items-center rounded-full border border-zinc-200 bg-white/70 px-3 text-[12px]">
									{microCopy.hint}
								</span>
							</div>

							{step !== "landing" && (
								<button
									onClick={() => {
										setChoice(null);
										setStep("landing");
									}}
									className="mt-4 inline-flex items-center rounded-full border border-zinc-200 bg-white/70 px-4 py-2 text-sm font-medium text-zinc-900 active:scale-[0.99]"
								>
									Réinitialiser
								</button>
							)}
						</div>

						<div className="flex justify-center lg:justify-end">
							<div className="scale-[0.92] sm:scale-[0.95]">
								<IphoneDemo
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
