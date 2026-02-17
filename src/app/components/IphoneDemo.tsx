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
	visible?: boolean;
	step: Step;
	choice: Choice | null;
	question: DemoQuestion;
	onStart: () => void;
	onPick: (c: Choice) => void;
	onShowResults: () => void;
	onRestart: () => void;
}) {
	const { step, question: q } = props;

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
		<div className="mx-auto w-full">
			<div className="flex justify-center">
				<div
					className={[
						"ip-demo-dock transition-all duration-500 ease-out",
						props.visible === false ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
					].join(" ")}
				>
					<div className="ip-demo-dock__wash" />
					<div className="ip-demo-dock__halo ip-demo-dock__halo--left" />
					<div className="ip-demo-dock__halo ip-demo-dock__halo--right" />

					<div className="ip-demo-dock__inner">
						<div className="relative mx-auto w-[320px] sm:w-[350px] md:w-[380px] lg:w-[400px] h-[680px] sm:h-[740px] md:h-[800px] lg:h-[840px] rounded-[3.4rem] bg-zinc-950 p-[12px] shadow-[0_40px_110px_rgba(0,0,0,0.22)]">
							{/* Side buttons */}
							<div className="pointer-events-none absolute -left-[7px] top-[170px] h-14 w-[5px] rounded-full bg-zinc-900/80" />
							<div className="pointer-events-none absolute -left-[7px] top-[242px] h-11 w-[5px] rounded-full bg-zinc-900/80" />
							<div className="pointer-events-none absolute -left-[7px] top-[297px] h-11 w-[5px] rounded-full bg-zinc-900/80" />
							<div className="pointer-events-none absolute -right-[7px] top-[225px] h-20 w-[5px] rounded-full bg-zinc-900/80" />

							<div className="relative h-full overflow-hidden rounded-[2.85rem] bg-white">
								{/* background */}
								<div className="absolute inset-0">
									<div
										className="absolute inset-0"
										style={{
											backgroundImage: "url(/inpulse-wave.png)",
											backgroundSize: "cover",
											backgroundPosition: "left",
											opacity: 0.58,
										}}
									/>
									<div className="absolute inset-0 bg-gradient-to-b from-white/78 via-white/68 to-white/90" />
									<div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-[hsl(var(--ip-primary)/0.16)] blur-3xl" />
									<div className="absolute -right-28 top-28 h-64 w-64 rounded-full bg-[hsl(var(--ip-accent)/0.12)] blur-3xl" />
								</div>

								{/* notch */}
								<div className="pointer-events-none absolute left-1/2 top-2 h-7 w-48 -translate-x-1/2 rounded-full bg-zinc-950/95" />
								<div className="pointer-events-none absolute left-1/2 top-[14px] h-2 w-2 -translate-x-[-72px] rounded-full bg-zinc-700/70" />

								{/* status */}
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

								{/* content canvas */}
								<div className="relative px-6 pb-6">
									<div className="relative h-[470px] sm:h-[520px] md:h-[560px] lg:h-[590px]">
										<StackedScreen isActive={show.landing} mounted={mounted}>
											<ScreenCard
												title="Prêt ?"
												subtitle="Touchez l’écran pour faire votre premier inPulse."
												footer="7 jours • 3–5 questions • anonyme"
											>
												<div className="mt-4 text-sm leading-relaxed text-zinc-700">
													Un inPulse = <span className="font-medium">un choix simple</span>.
													<br />
													Un signal collectif.
												</div>

												<div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11px] text-zinc-700 border border-zinc-200">
													<span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--ip-primary)/0.55)]" />
													1 tap
												</div>
											</ScreenCard>

											<button
												onClick={props.onStart}
												aria-label="Commencer"
												className="absolute inset-0"
											/>
										</StackedScreen>

										<StackedScreen isActive={show.question} mounted={mounted}>
											<ScreenCard
												title={q.title}
												subtitle="Choisissez. Sans justification."
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
												subtitle="Votre inPulse est envoyé."
												footer="un signal partagé"
											>
												<div className="mt-4 space-y-3">
													<p className="text-sm leading-relaxed text-zinc-700">
														Écouter ≠ agir.
														<br />
														Mesurer ≠ décider.
													</p>
													<button
														onClick={props.onShowResults}
														className="w-full rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-medium text-white active:scale-[0.99]"
													>
														Voir le signal
													</button>
													<button
														onClick={props.onRestart}
														className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 active:scale-[0.99]"
													>
														Refaire
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
												<div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-4">
													<div className="text-xs font-medium text-zinc-700">Agrégation</div>
													<div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-100">
														<div
															className="h-2 w-[45%] rounded-full bg-[hsl(var(--ip-primary))]"
															style={{ animation: "inpulsebar 1.2s ease-in-out infinite" }}
														/>
													</div>
												</div>
											</ScreenCard>
										</StackedScreen>
									</div>
								</div>

								{/* home indicator */}
								<div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
									<div className="h-1.5 w-28 rounded-full bg-zinc-900/15" />
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* end dock */}
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
				"absolute inset-0 transition-all duration-400 ease-out will-change-transform will-change-opacity",
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
		<div className="ip-glass-mini p-5">
			<div className="text-xl font-medium text-zinc-700">inPulse</div>
			<div className="mt-1 text-lg font-semibold tracking-tight text-zinc-950">
				{props.title}
			</div>
			<div className="mt-1 text-sm text-zinc-700/85">{props.subtitle}</div>
			<div className="mt-4">{props.children}</div>
			<div className="mt-4 text-[11px] text-zinc-700">{props.footer}</div>
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
			? "bg-[hsl(var(--ip-accent)/0.20)]"
			: "bg-[hsl(var(--ip-primary)/0.20)]";

	return (
		<button
			onClick={props.onClick}
			className="group relative w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-left active:scale-[0.99]"
		>
			<div
				className={`absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full blur-2xl ${glow}`}
			/>
			<div className="relative flex items-center justify-between">
				<div className="text-base font-semibold text-zinc-950">{props.label}</div>
				<div className="h-2 w-2 rounded-full bg-zinc-900/20 opacity-0 transition group-hover:opacity-100" />
			</div>
			<div className="relative mt-1 text-sm text-zinc-600">Un choix simple. Un signal.</div>
		</button>
	);
}

