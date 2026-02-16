"use client";

import { IphoneDemo } from "@/app/components/IphoneDemo";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { InPulseIcon } from "./components/InPulseIcon";

type SectionId = "hero" | "demo" | "principes" | "comment" | "booking";
const SECTION_IDS: SectionId[] = ["hero", "demo", "principes", "comment", "booking"];

function scrollToId(id: SectionId) {
	const el = document.getElementById(id);
	if (!el) return;
	el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HomePage() {
	const mainRef = useRef<HTMLElement | null>(null);
	const [activeId, setActiveId] = useState<SectionId>("hero");

	// header hidden ONLY on section 2
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
			{/* ✅ BACKGROUND (as at the beginning) */}
			<div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
				<Image src="/inpulse-wave.png" alt="" fill priority className="object-cover" />

				{/* wash */}
				<div className="absolute inset-0 bg-gradient-to-b from-white/86 via-white/72 to-white" />

				{/* halos (kept inside to avoid horizontal scroll) */}
				<div className="absolute left-[6%] top-[10%] h-[520px] w-[520px] rounded-full bg-[hsl(var(--ip-primary)/0.10)] blur-3xl" />
				<div className="absolute right-[6%] top-[18%] h-[520px] w-[520px] rounded-full bg-[hsl(var(--ip-accent)/0.08)] blur-3xl" />
			</div>

			{/* ✅ HEADER (stylisé glass) */}
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
								onClick={() => scrollToId("hero")}
								className="flex items-center gap-3"
								aria-label="Retour à l’accueil"
							>
								{/* ICON */}
								<div className="h-9 w-9 rounded-full bg-white/70 backdrop-blur-xl flex items-center justify-center">
									<InPulseIcon size={120} />
								</div>

								{/* TEXT */}
								<div className="leading-tight text-left">
									<div className="text-sm font-semibold tracking-tight text-zinc-950">
										inPulse
									</div>
									<div className="text-xs font-medium text-zinc-700">
										capteur de ressenti
									</div>
								</div>
							</button>

							{/* NAV */}
							<nav className="hidden md:flex items-center gap-5 text-sm text-zinc-700">
								<NavBtn label="Hero" active={activeId === "hero"} onClick={() => scrollToId("hero")} />
								<NavBtn label="Demo" active={activeId === "demo"} onClick={() => scrollToId("demo")} />
								<NavBtn label="Principes" active={activeId === "principes"} onClick={() => scrollToId("principes")} />
								<NavBtn label="Comment" active={activeId === "comment"} onClick={() => scrollToId("comment")} />
								<NavBtn label="Booking" active={activeId === "booking"} onClick={() => scrollToId("booking")} />
							</nav>

							{/* CTA */}
							<button
								onClick={() => scrollToId("booking")}
								className="rounded-full bg-zinc-950 px-4 py-2 text-xs font-medium text-white hover:bg-zinc-900"
							>
								Demander un inPulse
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* SECTION 1 — HERO */}
			<section id="hero" className="h-screen snap-start [scroll-snap-stop:always]">
				<div className="h-full flex flex-col px-6">
					{/* phantom (cohérence verticale avec header) */}
					<div className="h-24" />

					{/* content */}
					<div className="flex-1 flex items-center">
						<div className="mx-auto w-full max-w-6xl grid gap-10 md:grid-cols-2 items-center">
							{/* LEFT */}
							<div className="max-w-xl">
								<div className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/45 px-3 py-1 text-xs text-zinc-700 backdrop-blur-xl">
									<span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--ip-accent))]" />
									7 jours • 3–5 questions • anonyme
								</div>

								<h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight text-zinc-950">
									Un signal collectif,
									<br />
									<span className="text-zinc-600">simple et contextuel.</span>
								</h1>

								<p className="mt-5 text-base md:text-lg leading-relaxed text-zinc-700/90 max-w-lg">
									Pas de débat. Pas de verbatim.
									<span className="text-zinc-600"> Juste une lecture partagée — sans dette d’écoute.</span>
								</p>

								<div className="mt-9 flex flex-col sm:flex-row gap-3">
									<button
										onClick={() =>
											document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" })
										}
										className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-900"
									>
										Tester un inPulse
									</button>

									<button
										onClick={() =>
											document.getElementById("principes")?.scrollIntoView({ behavior: "smooth", block: "start" })
										}
										className="rounded-full border border-white/35 bg-white/45 px-6 py-3 text-sm font-medium text-zinc-900 backdrop-blur-xl hover:bg-white/55"
									>
										Lire les principes
									</button>
								</div>

								<div className="mt-6 text-xs text-zinc-600">
									Mise en place légère • résultat lisible • collectif protégé
								</div>
							</div>

							{/* RIGHT — GLASS PANEL (safe) */}
							<div className="hidden md:flex justify-center">
								<div className="ip-glass ip-glass-strong w-full max-w-md p-7">
									<div className="text-sm font-semibold text-zinc-950">Ce que vous obtenez</div>
									<p className="mt-2 text-sm leading-relaxed text-zinc-700/90">
										Un cadre court, une mesure propre, un résultat immédiatement partageable.
									</p>

									<div className="mt-6 space-y-4">
										<div className="flex gap-3">
											<div className="mt-0.5 h-2 w-2 rounded-full bg-[hsl(var(--ip-accent))]" />
											<div>
												<div className="text-sm font-medium text-zinc-950">Un cadre</div>
												<div className="text-sm text-zinc-700/90">Lieu + collectif + période.</div>
											</div>
										</div>

										<div className="flex gap-3">
											<div className="mt-0.5 h-2 w-2 rounded-full bg-[hsl(var(--ip-primary))]" />
											<div>
												<div className="text-sm font-medium text-zinc-950">3–5 questions</div>
												<div className="text-sm text-zinc-700/90">Fermées. Rapides. Sans verbatim.</div>
											</div>
										</div>

										<div className="flex gap-3">
											<div className="mt-0.5 h-2 w-2 rounded-full bg-[hsl(var(--ip-secondary))]" />
											<div>
												<div className="text-sm font-medium text-zinc-950">Un signal</div>
												<div className="text-sm text-zinc-700/90">Agrégé, lisible, exploitable.</div>
											</div>
										</div>
									</div>

									<div className="mt-7 rounded-2xl border border-white/30 bg-white/35 p-4">
										<div className="text-xs font-semibold text-zinc-950">Règle d’or</div>
										<div className="mt-1 text-sm text-zinc-700/90">
											Mesurer ≠ décider. Écouter ≠ agir.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* scroll hint */}
					<div className="pb-8 flex justify-center">
						<div className="ip-glass px-4 py-2 rounded-full text-xs text-zinc-700/90">
							<span className="mr-2 opacity-80">Scroller</span>
							<span className="inline-block animate-bounce">↓</span>
						</div>
					</div>
				</div>
			</section>


			{/* SECTION 2 — DEMO (header hidden) */}
			<section id="demo" className="h-screen snap-start [scroll-snap-stop:always] overflow-hidden">
				<div className="h-full flex flex-col px-6">
					<div className="h-16" />
					<div className="flex-1 flex items-center justify-center">
						<div className="scale-[0.9]">
							<IphoneDemo
								step="landing"
								choice={null}
								question={{
									id: "demo-preview",
									title: "Vous êtes plutôt…",
									left: { label: "Option A", emoji: "◀︎" },
									right: { label: "Option B", emoji: "▶︎" },
								}}
								onStart={() => { }}
								onPick={() => { }}
								onShowResults={() => { }}
								onRestart={() => { }}
							/>
						</div>
					</div>
					<div className="h-16" />
				</div>
			</section>

			{/* SECTION 3 — PRINCIPES */}
			<section id="principes" className="h-screen snap-start [scroll-snap-stop:always]">
				<div className="h-full flex flex-col px-6">
					{/* phantom (cohérence verticale avec header) */}
					<div className="h-24" />

					<div className="flex-1 flex items-center">
						<div className="mx-auto w-full max-w-6xl">
							<div className="max-w-2xl">
								<h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-950">
									Principes
								</h2>
								<p className="mt-3 text-sm md:text-base leading-relaxed text-zinc-700/90">
									inPulse produit un <span className="font-medium text-zinc-900">signal collectif</span> volontairement limité :
									assez clair pour aligner, assez simple pour éviter le bruit.
								</p>
							</div>

							<div className="mt-10 grid gap-5 md:grid-cols-3">
								<div className="ip-glass ip-glass-strong p-7">
									<div className="text-base font-semibold text-zinc-950">Court & léger</div>
									<p className="mt-3 text-sm leading-relaxed text-zinc-700/90">
										3–5 questions. 10 secondes. Une période courte (ex : 7 jours).
									</p>
								</div>

								<div className="ip-glass ip-glass-strong p-7">
									<div className="text-base font-semibold text-zinc-950">Neutre</div>
									<p className="mt-3 text-sm leading-relaxed text-zinc-700/90">
										Pas de justification, pas d’argumentaire : un signal, pas un débat.
									</p>
								</div>

								<div className="ip-glass ip-glass-strong p-7">
									<div className="text-base font-semibold text-zinc-950">Anonyme</div>
									<p className="mt-3 text-sm leading-relaxed text-zinc-700/90">
										Aucune exposition individuelle. Un résultat agrégé, partagé.
									</p>
								</div>
							</div>

							<div className="mt-6 text-xs text-zinc-600">
								Objectif : remplacer les impressions par une lecture simple et commune.
							</div>
						</div>
					</div>

					{/* breathing */}
					<div className="h-12" />
				</div>
			</section>

			{/* SECTION 4 — COMMENT */}
			<section id="comment" className="h-screen snap-start [scroll-snap-stop:always]">
				<div className="h-full flex flex-col px-6">
					{/* phantom */}
					<div className="h-24" />

					<div className="flex-1 flex items-center">
						<div className="mx-auto w-full max-w-6xl">
							<div className="max-w-2xl">
								<h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-950">
									Comment ça marche
								</h2>
								<p className="mt-3 text-sm md:text-base leading-relaxed text-zinc-700/90">
									Un cadre simple, une mise en place légère, un résultat lisible — sans promesse impossible.
								</p>
							</div>

							<div className="mt-10 grid gap-5 md:grid-cols-3">
								<div className="ip-glass ip-glass-strong p-7">
									<div className="text-sm font-semibold text-zinc-950">1 — Contexte</div>
									<p className="mt-3 text-sm leading-relaxed text-zinc-700/90">
										Un lieu, un collectif, une période courte. On fixe le cadre.
									</p>
									<div className="mt-4 text-xs text-zinc-600">
										Exemple : “équipe magasin · 7 jours”
									</div>
								</div>

								<div className="ip-glass ip-glass-strong p-7">
									<div className="text-sm font-semibold text-zinc-950">2 — Questions</div>
									<p className="mt-3 text-sm leading-relaxed text-zinc-700/90">
										3–5 questions fermées, rapides, sans verbatim. Le signal reste propre.
									</p>
									<div className="mt-4 text-xs text-zinc-600">
										“Plutôt A / plutôt B ?”
									</div>
								</div>

								<div className="ip-glass ip-glass-strong p-7">
									<div className="text-sm font-semibold text-zinc-950">3 — Signal</div>
									<p className="mt-3 text-sm leading-relaxed text-zinc-700/90">
										Un résultat agrégé : lisible, partageable, exploitable.
									</p>
									<div className="mt-4 text-xs text-zinc-600">
										Pas de dette d’écoute.
									</div>
								</div>
							</div>

							<div className="mt-6 text-xs text-zinc-600">
								Résultat : un signal clair, sans bruit, pour mieux décider ensemble.
							</div>
						</div>
					</div>

					{/* breathing */}
					<div className="h-12" />
				</div>
			</section>

			{/* SECTION 5 — BOOKING (card + copyright) */}
			<section id="booking" className="h-screen snap-start [scroll-snap-stop:always]">
				<div className="h-full flex flex-col justify-between px-6">
					{/* phantom */}
					<div className="h-24" />

					{/* card */}
					<div className="flex justify-center">
						<div className="w-full max-w-xl rounded-2xl bg-black text-white p-8 text-center">
							<h2 className="text-xl font-semibold">Lancer un inPulse</h2>
							<p className="mt-3 text-sm opacity-80">
								Une configuration simple. Une période courte. Un signal clair.
							</p>
						</div>
					</div>

					{/* copyright */}
					<div className="pb-6 text-center text-xs text-zinc-600">
						© {new Date().getFullYear()} inPulse
					</div>
				</div>
			</section>
		</main>
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

