export default function PrincipesSection() {
	return (
		<section id="principes" className="h-screen snap-start [scroll-snap-stop:always]">
			<div className="h-full flex flex-col px-6">
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
							<Card title="Court & léger" text="3–5 questions. 10 secondes. Une période courte (ex : 7 jours)." />
							<Card title="Neutre" text="Pas de justification, pas d’argumentaire : un signal, pas un débat." />
							<Card title="Anonyme" text="Aucune exposition individuelle. Un résultat agrégé, partagé." />
						</div>

						<div className="mt-6 text-xs text-zinc-600">
							Objectif : remplacer les impressions par une lecture simple et commune.
						</div>
					</div>
				</div>

				<div className="h-12" />
			</div>
		</section>
	);
}

function Card(props: { title: string; text: string }) {
	return (
		<div className="ip-glass ip-glass-strong p-7">
			<div className="text-base font-semibold text-zinc-950">{props.title}</div>
			<p className="mt-3 text-sm leading-relaxed text-zinc-700/90">{props.text}</p>
		</div>
	);
}

