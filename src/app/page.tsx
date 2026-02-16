"use client";

import { GradientBorderButton } from "@/app/components/GradientBorderButton";
import { InPulseIcon } from "@/app/components/InPulseIcon";
import { Choice, DemoQuestion, IphoneDemo, Step } from "@/app/components/IphoneDemo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type SectionId = "hero" | "demo" | "principes" | "comment" | "booking";

const SECTION_IDS: SectionId[] = ["hero", "demo", "principes", "comment", "booking"];

function scrollToId(id: SectionId, block: ScrollLogicalPosition = "start") {
	const el = document.getElementById(id);
	if (!el) return;
	el.scrollIntoView({ behavior: "smooth", block });
}

export default function HomePage() {
	const router = useRouter();
	const mainRef = useRef<HTMLElement | null>(null);

	const [step, setStep] = useState<Step>("landing");
	const [choice, setChoice] = useState<Choice | null>(null);

	// track current section for wheel paging
	const [activeId, setActiveId] = useState<SectionId>("hero");
	const wheelLockRef = useRef(false);
	const lastWheelAtRef = useRef(0);

	const q: DemoQuestion = useMemo(
		() => ({
			id: "pizza-sushi",
			title: "Vous êtes plutôt…",
			left: { label: "Pizza", emoji: "🍕" },
			right: { label: "Sushi", emoji: "🍣" },
		}),
		[]
	);

	function goToResults() {
		setStep("processing");
		window.setTimeout(() => {
			const pick = choice ?? "A";
			router.push(`/results?choice=${pick}&q=${q.id}`);
		}, 900);
	}

	// ✅ Observe which section is mostly visible (for wheel paging)
	useEffect(() => {
		const root = mainRef.current;
		if (!root) return;

		const sections = SECTION_IDS
			.map((id) => document.getElementById(id))
			.filter(Boolean) as HTMLElement[];

		const obs = new IntersectionObserver(
			(entries) => {
				// pick the one with highest intersection ratio
				let best: { id: SectionId; ratio: number } | null = null;
				for (const e of entries) {
					const id = e.target.id as SectionId;
					if (!SECTION_IDS.includes(id)) continue;
					if (!best || e.intersectionRatio > best.ratio) best = { id, ratio: e.intersectionRatio };
				}
				if (best && best.ratio >= 0.55) setActiveId(best.id);
			},
			{
				root,
				threshold: [0.35, 0.55, 0.7, 0.85],
			}
		);

		sections.forEach((s) => obs.observe(s));
		return () => obs.disconnect();
	}, []);

	// ✅ Wheel: one “tick” -> next/prev section (smooth, throttled)
	useEffect(() => {
		const root = mainRef.current;
		if (!root) return;

		const onWheel = (e: WheelEvent) => {
			// ignore trackpad micro deltas
			const abs = Math.abs(e.deltaY);
			if (abs < 10) return;

			// throttle
			const now = Date.now();
			if (wheelLockRef.current) {
				e.preventDefault();
				return;
			}
			if (now - lastWheelAtRef.current < 650) {
				e.preventDefault();
				return;
			}

			e.preventDefault();
			lastWheelAtRef.current = now;
			wheelLockRef.current = true;

			const idx = SECTION_IDS.indexOf(activeId);
			const dir = e.deltaY > 0 ? 1 : -1;
			const nextIdx = Math.max(0, Math.min(SECTION_IDS.length - 1, idx + dir));
			const nextId = SECTION_IDS[nextIdx];

			// demo is tall: center it so the phone is never cut
			if (nextId === "demo") scrollToId(nextId, "center");
			else scrollToId(nextId, "start");

			window.setTimeout(() => {
				wheelLockRef.current = false;
			}, 750);
		};

		root.addEventListener("wheel", onWheel, { passive: false });
		return () => root.removeEventListener("wheel", onWheel as any);
	}, [activeId]);

	return (
		<main
			ref={(el) => {
				// TS-friendly
				mainRef.current = el;
			}}
			className="relative h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth overscroll-contain"
		>
			{/* Background fixed */}
			<div className="pointer-events-none fixed inset-0 -z-10">
				<Image src="/inpulse-wave.png" alt="" fill priority className="object-cover" />
				<div className="absolute inset-0 bg-gradient-to-b from-white/86 via-white/72 to-white" />
				<div className="absolute -left-40 top-16 h-[520px] w-[520px] rounded-full bg-[hsl(var(--ip-primary)/0.10)] blur-3xl" />
				<div className="absolute -right-40 top-40 h-[520px] w-[520px] rounded-full bg-[hsl(var(--ip-accent)/0.08)] blur-3xl" />
			</div>

			{/* Fixed header: keep perfect initial position */}
			<header className="fixed top-3 left-0 right-0 z-30">
				<div className="mx-auto w-full max-w-6xl px-6">
					<div className="rounded-2xl border border-white/35 bg-white/55 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.10)]">
						<div className="flex h-16 items-center justify-between px-4">
							{/* Brand */}
							<button
								type="button"
								onClick={() => scrollToId("hero")}
								className="flex items-center gap-3"
								aria-label="Retour à l’accueil"
							>
								{/* ✅ badge size matches icon (no “huge border + tiny icon”) */}
								<div className="grid h-20 w-20 place-items-center">
									<InPulseIcon
										size={650}
										className="animate-[pulse_6s_ease-in-out_infinite]"
										priority
									/>
								</div>

								<div className="leading-tight text-left">
									<div className="text-sm font-semibold tracking-tight text-zinc-950">inPulse</div>
									<div className="text-xs text-zinc-500">capteur de ressenti</div>
								</div>
							</button>

							{/* Nav */}
							<nav className="hidden items-center gap-6 text-sm text-zinc-600 md:flex">
								<button className="hover:text-zinc-950" onClick={() => scrollToId("hero")}>Accueil</button>
								<button className="hover:text-zinc-950" onClick={() => scrollToId("demo", "center")}>Test</button>
								<button className="hover:text-zinc-950" onClick={() => scrollToId("principes")}>Principes</button>
								<button className="hover:text-zinc-950" onClick={() => scrollToId("comment")}>Comment</button>
								<button className="hover:text-zinc-950" onClick={() => scrollToId("booking")}>Booker</button>
							</nav>

							<GradientBorderButton onClick={() => scrollToId("booking")}>
								Demander un inPulse
							</GradientBorderButton>
						</div>
					</div>
				</div>
			</header>

			{/* Spacer for fixed header */}
			<div className="h-24" />

			{/* HERO */}
			<section id="hero" className="snap-start min-h-screen scroll-mt-28">
				<div className="mx-auto w-full max-w-6xl px-6 pt-10 pb-16 md:pb-20">
					<div className="max-w-2xl">
						<div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/25 px-3 py-1 text-xs text-zinc-700 backdrop-blur-xl">
							<span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--ip-accent))]" />
							7 jours • 3–5 questions • anonyme
						</div>

						<h1 className="mt-6 text-12xl font-semibold tracking-tight md:text-6xl text-zinc-950">
							inPulse
						</h1>

						<p className="mt-4 text-base leading-relaxed text-zinc-700 md:text-lg">
							Un signal collectif, simple et contextuel.
							<span className="text-zinc-500"> Pas de débat. Pas de verbatim. Pas de dette d’écoute.</span>
						</p>

						<div className="mt-7 flex flex-col gap-3 sm:flex-row">
							<GradientBorderButton
								onClick={() => {
									setChoice(null);
									setStep("question");
									scrollToId("demo", "center");
								}}
							>
								Tester un inPulse
							</GradientBorderButton>

							<button
								onClick={() => scrollToId("principes")}
								className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/25 px-5 py-3 text-sm font-medium text-zinc-900 backdrop-blur-xl hover:bg-white/35"
							>
								Lire les principes
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* DEMO (centered scroll + enough space so phone isn't clipped) */}
			<section id="demo" className="snap-start min-h-screen scroll-mt-32">
				<div className="mx-auto w-full max-w-6xl px-6 pt-8 pb-10">
					<div className="flex flex-col items-center gap-6">
						<IphoneDemo
							step={step}
							choice={choice}
							question={q}
							onStart={() => {
								setChoice(null);
								setStep("question");
							}}
							onPick={(c) => {
								setChoice(c);
								setStep("bravo");
							}}
							onShowResults={() => goToResults()}
							onRestart={() => {
								setChoice(null);
								setStep("question");
							}}
						/>

						<div className="ip-glass px-6 py-4 text-center max-w-xl">
							<div className="relative text-sm font-semibold text-zinc-950">Test en direct</div>
							<div className="relative mt-2 text-sm text-zinc-700/90">
								Touchez l’iPhone. Répondez. Obtenez un signal.
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* PRINCIPES (content higher + cards taller) */}
			<section id="principes" className="snap-start min-h-screen scroll-mt-32">
				<div className="mx-auto w-full max-w-6xl px-6 py-12 md:py-14">
					<div className="max-w-2xl">
						<h2 className="text-2xl font-semibold tracking-tight md:text-3xl text-zinc-950">
							Principes
						</h2>
						<p className="mt-3 text-base leading-relaxed text-zinc-700">
							InPulse pose un <span className="font-medium text-zinc-900">signal</span> clair — volontairement limité —
							pour remplacer les impressions par une lecture partagée.
						</p>
					</div>

					<div className="mt-8 grid gap-5 md:grid-cols-3">
						<GlassCard title="Court & léger" text="3–5 questions. 10 secondes. Une période claire (7 jours)." />
						<GlassCard title="Neutre" text="Pas de débat, pas de justification : un signal, pas un argumentaire." />
						<GlassCard title="Anonyme (crédible)" text="Aucune exposition individuelle. Best effort anti-abus." />
					</div>
				</div>
			</section>

			{/* COMMENT (same treatment) */}
			<section id="comment" className="snap-start min-h-screen scroll-mt-32">
				<div className="mx-auto w-full max-w-6xl px-6 py-12 md:py-14">
					<div className="max-w-2xl">
						<h2 className="text-2xl font-semibold tracking-tight md:text-3xl text-zinc-950">
							Comment ça marche
						</h2>
						<p className="mt-3 text-base leading-relaxed text-zinc-700">
							Un cadre simple. Une mise en place légère. Un résultat lisible — sans promesse impossible.
						</p>
					</div>

					<div className="mt-8 grid gap-5 md:grid-cols-3">
						<GlassCard title="1. Contexte" text="Un lieu, un collectif, une période courte (7 jours)." />
						<GlassCard title="2. 3–5 questions" text="Fermées, rapides, sans verbatim. Le signal reste propre." />
						<GlassCard title="3. Signal" text="Lisible, partagé, exploitable — sans dette d’écoute." />
					</div>
				</div>
			</section>

			{/* BOOKING */}
			<section id="booking" className="snap-start min-h-screen scroll-mt-32">
				<div className="mx-auto w-full max-w-6xl px-6 py-12">
					<div className="rounded-[2.25rem] border border-zinc-200 bg-zinc-950 p-8 text-white md:p-10">
						<h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
							Lancer un InPulse
						</h2>

						<p className="mt-3 max-w-2xl text-base leading-relaxed text-white/75">
							On le configure ensemble en quelques minutes. Vous obtenez un lien prêt à partager,
							une période courte, et un résultat clair.
						</p>

						<div className="mt-5 flex flex-wrap gap-2 text-xs text-white/70">
							<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Sans compte</span>
							<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Sans verbatim</span>
							<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Cadre court</span>
							<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Anonyme</span>
						</div>

						<form className="mt-7 grid gap-3 md:grid-cols-3">
							<input
								className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/20"
								placeholder="Lieu (ex: magasin, site, événement)"
							/>
							<input
								className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/20"
								placeholder="Public (ex: équipe, visiteurs, clients)"
							/>
							<GradientBorderButton variant="light" type="button" fullWidth>
								Recevoir une proposition
							</GradientBorderButton>
						</form>

						<div className="mt-4 text-xs text-white/55">
							Réponse rapide. Pas de collecte inutile.
						</div>
					</div>

					<div className="mt-6 text-center text-xs text-zinc-500">
						© {new Date().getFullYear()} inPulse
					</div>
				</div>
			</section>
		</main>
	);
}

function GlassCard({ title, text }: { title: string; text: string }) {
	return (
		<div className="ip-glass ip-glass-strong p-7 min-h-[220px] flex flex-col">
			<div className="relative">
				<div className="text-base font-semibold text-zinc-950">{title}</div>
				<p className="mt-3 text-sm leading-relaxed text-zinc-700/90">{text}</p>
			</div>
		</div>
	);
}
