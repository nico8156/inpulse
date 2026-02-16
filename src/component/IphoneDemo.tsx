"use client";

import React, { useEffect, useMemo, useState } from "react";

export type Step = "landing" | "question" | "bravo" | "processing";
export type Choice = "A" | "B";

export type DemoQuestion = {
	id: string;
	title: string;
	left: { label: string; emoji: string };
	right: { label: string; emoji: string };
};

export function IphoneDemo(props: {
	step: Step;
	choice: Choice | null;
	question: DemoQuestion;
	onStart: () => void;
	onPick: (c: Choice) => void;
	onShowResults: () => void;
	onRestart: () => void;
}) {
	const { step, question: q } = props;

	// Keep transitions smooth but SSR-safe
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const show = useMemo(
		() => ({
			landing: step === "landing",
			question: step === "question",
			bravo: step === "bravo",
			processing: step === "processing",
		}),
		[step]
	);

	return (
		<div className="mx-auto w-full max-w-[700px]">
			{/* Fixed-height wrapper prevents page shifting */}
			<div className="relative h-[760px] sm:h-[820px] md:h-[900px]">
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="relative w-full max-w-[520px]">
						{/* Outer glass card */}
						<div className="rounded-[3.2rem] border border-zinc-200 bg-white/55 p-6 backdrop-blur">
							{/* Device */}
							<div className="relative mx-auto w-full rounded-[3.3rem] bg-zinc-950 p-[12px] shadow-[0_40px_110px_rgba(0,0,0,0.22)]">
								{/* Side buttons (realism) */}
								<div className="pointer-events-none absolute -left-[7px] top-[150px] h-14 w-[5px] rounded-full bg-zinc-900/80" />
								<div className="pointer-events-none absolute -left-[7px] top-[220px] h-11 w-[5px] rounded-full bg-zinc-900/80" />
								<div className="pointer-events-none absolute -left-[7px] top-[275px] h-11 w-[5px] rounded-full bg-zinc-900/80" />
								<div className="pointer-events-none absolute -right-[7px] top-[200px] h-20 w-[5px] rounded-full bg-zinc-900/80" />

								{/* Screen */}
								<div className="relative overflow-hidden rounded-[2.75rem] bg-white">
									{/* Screen background */}
									<div className="absolute inset-0">
										<div
											className="absolute inset-0 bg-[image:url('/inpulse-wave.png')] bg-cover bg-left"
											style={{ opacity: 0.56 }}
										/>
										<div className="absolute inset-0 bg-gradient-to-b from-white/78 via-white/68 to-white/88" />
										<div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-[hsl(var(--ip-primary)/0.16)] blur-3xl" />
										<div className="absolute -right-28 top-28 h-64 w-64 rounded-full bg-[hsl(var(--ip-accent)/0.12)] blur-3xl" />
									</div>

									{/* Notch */}
									<div className="pointer-events-none absolute left-1/2 top-2 h-7 w-44 -translate-x-1/2 rounded-full bg-zinc-950/95" />
									<div className="pointer-events-none absolute left-1/2 top-[14px] h-2 w-2 -translate-x-[-62px] rounded-full bg-zinc-700/70" />

									{/* Status bar */}
									<div className="relative flex items-center justify-between px-6 pb-3 pt-7 text-[11px] text-zinc-700">
										<div className="font-medium">9:41</div>
										<div className="flex items-center gap-2">
											<Dot />
											<Dot />
											<Dot />
											<span className="ml-1 rounded-full bg-zinc-900/8 px-2 py-0.5 text-[10px]">
												inPulse
											</span>
										</div>
									</div>

									{/* ✅ Content canvas with fixed height (prevents “rolled up”) */}
									<div className="relative px-6 pb-6">
										<div className="relative h-[460px] sm:h-[500px]">
											<StackedScreen isActive={show.landing} mounted={mounted}>
												<ScreenCard
													title="Êtes-vous prêt ?"
													subtitle="Touchez l’écran pour faire votre premier inPulse."
													footer="7 jours • 3–5 questions • anonyme"
												>
													<div className="mt-4 space-y-3 text-sm text-zinc-700">
														<p className="leading-relaxed">
															Un inPulse est un <span className="font-medium">signal collectif</span>.
															<br />
															Simple, contextuel, temporaire.
														</p>
														<div className="flex items-center gap-2 text-xs text-zinc-500">
															<span className="h-1 w-10 rounded-full bg-[hsl(var(--ip-primary)/0.35)]" />
															<span className="h-1 w-10 rounded-full bg-[hsl(var(--ip-accent)/0.35)]" />
															<span className="h-1 w-10 rounded-full bg-[hsl(var(--ip-secondary)/0.60)]" />
														</div>
													</div>
												</ScreenCard>

												{/* Tap anywhere to start */}
												<button
													onClick={props.onStart}
													aria-label="Commencer le premier inPulse"
													className="absolute inset-0"
												/>
											</StackedScreen>

											<StackedScreen isActive={show.question} mounted={mounted}>
												<ScreenCard
													title={q.title}
													subtitle="Choisissez simplement. Sans justification."
													footer="signal • pas débat • pas de verbatim"
												>
													<div className="mt-4 grid grid-cols-1 gap-3">
														<ChoiceButton
															label={`${q.left.emoji} ${q.left.label}`}
															onClick={() => props.onPick("A")}
															tint="accent"
														/>
														<ChoiceButton
															label={`${q.right.emoji} ${q.right.label}`}
															onClick={() => props.onPick("B")}
															tint="primary"
														/>
													</div>

													<button
														onClick={props.onRestart}
														className="mt-4 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 active:scale-[0.99]"
													>
														Revenir
													</button>
												</ScreenCard>
											</StackedScreen>

											<StackedScreen isActive={show.bravo} mounted={mounted}>
												<ScreenCard
													title="Bravo."
													subtitle="Vous venez de faire votre premier inPulse."
													footer="un signal partagé"
												>
													<div className="mt-4 space-y-3">
														<p className="text-sm leading-relaxed text-zinc-700">
															Écouter ≠ agir. Mesurer ≠ décider.
															<br />
															Ici, juste un signal.
														</p>

														<button
															onClick={props.onShowResults}
															className="w-full rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-medium text-white active:scale-[0.99]"
														>
															Accéder au résultat
														</button>

														<button
															onClick={props.onRestart}
															className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 active:scale-[0.99]"
														>
															Refaire un inPulse
														</button>
													</div>
												</ScreenCard>
											</StackedScreen>

											<StackedScreen isActive={show.processing} mounted={mounted}>
												<ScreenCard
													title="Calcul du signal…"
													subtitle="Agrégation en cours (démo)."
													footer="quelques secondes"
												>
													<div className="mt-5">
														<ProgressBar />
														<div className="mt-4 text-xs text-zinc-500">
															On laisse volontairement un temps de “traitement”.
														</div>
													</div>
												</ScreenCard>
											</StackedScreen>
										</div>
									</div>

									{/* Home indicator */}
									<div className="pointer-events-none relative pb-4">
										<div className="mx-auto h-1.5 w-28 rounded-full bg-zinc-900/15" />
									</div>
								</div>
							</div>

							{/* Hint */}
							<div className="mt-4 text-center text-xs text-zinc-600">
								<span className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 backdrop-blur">
									iPhone interactif • transitions douces
								</span>
							</div>
						</div>

						<div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3.5rem] bg-[hsl(var(--ip-primary)/0.08)] blur-3xl" />
					</div>
				</div>
			</div>
		</div>
	);
}

function StackedScreen({
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
				"absolute inset-0 transition-all duration-300 ease-out",
				isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
				mounted ? "" : "transition-none",
				isActive ? "pointer-events-auto" : "pointer-events-none",
			].join(" ")}
		>
			{children}
		</div>
	);
}

function Dot() {
	return <span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-900/35" />;
}

function ScreenCard(props: {
	title: string;
	subtitle: string;
	footer: string;
	children: React.ReactNode;
}) {
	return (
		<div className="relative rounded-[1.9rem] border border-zinc-200 bg-white/78 p-5 backdrop-blur">
			<div className="text-xs font-medium text-zinc-500">inPulse</div>
			<div className="mt-1 text-lg font-semibold tracking-tight text-zinc-950">
				{props.title}
			</div>
			<div className="mt-1 text-sm text-zinc-600">{props.subtitle}</div>
			<div className="mt-4">{props.children}</div>
			<div className="mt-4 text-[11px] text-zinc-500">{props.footer}</div>
		</div>
	);
}

function ChoiceButton(props: {
	label: string;
	onClick: () => void;
	tint: "primary" | "accent";
}) {
	const glow =
		props.tint === "accent"
			? "bg-[hsl(var(--ip-accent)/0.18)]"
			: "bg-[hsl(var(--ip-primary)/0.18)]";

	return (
		<button
			onClick={props.onClick}
			className="group relative w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-left active:scale-[0.99]"
		>
			<div className={`absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full blur-2xl ${glow}`} />
			<div className="relative flex items-center justify-between">
				<div className="text-base font-semibold text-zinc-950">{props.label}</div>
				<div className="h-2 w-2 rounded-full bg-zinc-900/20 opacity-0 transition group-hover:opacity-100" />
			</div>
			<div className="relative mt-1 text-sm text-zinc-600">Un choix simple. Un signal.</div>
		</button>
	);
}

function ProgressBar() {
	return (
		<div className="rounded-2xl border border-zinc-200 bg-white p-4">
			<div className="text-xs font-medium text-zinc-700">Agrégation</div>
			<div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-100">
				<div
					className="h-2 w-[45%] rounded-full bg-[hsl(var(--ip-primary))]"
					style={{ animation: "inpulsebar 1.2s ease-in-out infinite" }}
				/>
			</div>
		</div>
	);
}
