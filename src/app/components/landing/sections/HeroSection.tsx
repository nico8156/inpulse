"use client";

export default function HeroSection(props: {
	onPrimary: () => void;
	onSecondary: () => void;
}) {
	return (
		<section id="hero" className="h-screen snap-start [scroll-snap-stop:always]">
			<div className="h-full flex flex-col px-6">
				<div className="h-24" />

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
									onClick={props.onPrimary}
									className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-900"
								>
									Tester un inPulse
								</button>

								<button
									onClick={props.onSecondary}
									className="rounded-full border border-white/35 bg-white/45 px-6 py-3 text-sm font-medium text-zinc-900 backdrop-blur-xl hover:bg-white/55"
								>
									Lire les principes
								</button>
							</div>

							<div className="mt-6 text-xs text-zinc-600">
								Mise en place légère • résultat lisible • collectif protégé
							</div>
						</div>

						{/* RIGHT — GLASS PANEL */}
						<div className="hidden md:flex justify-center">
							<div className="ip-glass ip-glass-strong w-full max-w-md p-7">
								<div className="text-sm font-semibold text-zinc-950">Ce que vous obtenez</div>
								<p className="mt-2 text-sm leading-relaxed text-zinc-700/90">
									Un cadre court, une mesure propre, un résultat immédiatement partageable.
								</p>

								<div className="mt-6 space-y-4">
									<Row dotClass="bg-[hsl(var(--ip-accent))]" title="Un cadre" text="Lieu + collectif + période." />
									<Row dotClass="bg-[hsl(var(--ip-primary))]" title="3–5 questions" text="Fermées. Rapides. Sans verbatim." />
									<Row dotClass="bg-[hsl(var(--ip-secondary))]" title="Un signal" text="Agrégé, lisible, exploitable." />
								</div>

								<div className="mt-7 rounded-2xl border border-white/30 bg-white/35 p-4">
									<div className="text-xs font-semibold text-zinc-950">Règle d’or</div>
									<div className="mt-1 text-sm text-zinc-700/90">Mesurer ≠ décider. Écouter ≠ agir.</div>
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
	);
}

function Row(props: { dotClass: string; title: string; text: string }) {
	return (
		<div className="flex gap-3">
			<div className={`mt-1.5 h-2 w-2 rounded-full ${props.dotClass}`} />
			<div>
				<div className="text-sm font-medium text-zinc-950">{props.title}</div>
				<div className="text-sm text-zinc-700/90">{props.text}</div>
			</div>
		</div>
	);
}

