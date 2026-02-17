export default function CommentSection() {
	return (
		<section id="comment" className="h-screen snap-start [scroll-snap-stop:always]">
			<div className="h-full flex flex-col px-6">
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
							<StepCard title="1 — Contexte" text="Un lieu, un collectif, une période courte. On fixe le cadre." hint="Ex : “équipe magasin · 7 jours”" />
							<StepCard title="2 — Questions" text="3–5 questions fermées, rapides, sans verbatim. Le signal reste propre." hint="“Plutôt A / plutôt B ?”" />
							<StepCard title="3 — Signal" text="Un résultat agrégé : lisible, partageable, exploitable." hint="Pas de dette d’écoute." />
						</div>

						<div className="mt-6 text-xs text-zinc-600">
							Résultat : un signal clair, sans bruit, pour mieux décider ensemble.
						</div>
					</div>
				</div>

				<div className="h-12" />
			</div>
		</section>
	);
}

function StepCard(props: { title: string; text: string; hint: string }) {
	return (
		<div className="ip-glass ip-glass-strong p-7">
			<div className="text-sm font-semibold text-zinc-950">{props.title}</div>
			<p className="mt-3 text-sm leading-relaxed text-zinc-700/90">{props.text}</p>
			<div className="mt-4 text-xs text-zinc-600">{props.hint}</div>
		</div>
	);
}

