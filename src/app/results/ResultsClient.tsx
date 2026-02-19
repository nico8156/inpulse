"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function ResultsClient() {
	const params = useSearchParams();
	const choice = (params.get("choice") ?? "A") as "A" | "B";
	const qid = params.get("q") ?? "pizza-sushi";

	const q = useMemo(() => {
		if (qid === "pizza-sushi") {
			return {
				title: "Vous êtes plutôt…",
				A: { label: "Pizza", emoji: "🍕" },
				B: { label: "Sushi", emoji: "🍣" },
			};
		}
		return {
			title: "Vous êtes plutôt…",
			A: { label: "Option A", emoji: "🟣" },
			B: { label: "Option B", emoji: "🟠" },
		};
	}, [qid]);

	const results = useMemo(() => {
		const baseA = 63;
		const delta = choice === "A" ? 2 : -2;
		const A = Math.max(10, Math.min(90, baseA + delta));
		const B = 100 - A;
		return { A, B };
	}, [choice]);

	return (
		<main className="relative min-h-screen overflow-hidden bg-white text-[hsl(var(--ip-ink))]">
			{/* Background */}
			<div className="pointer-events-none absolute inset-0">
				<Image src="/inpulse-wave.png" alt="" fill priority className="object-cover" />
				<div className="absolute inset-0 bg-gradient-to-b from-white/86 via-white/72 to-white" />
				<div className="absolute -left-40 top-16 h-[520px] w-[520px] rounded-full bg-[hsl(var(--ip-primary)/0.10)] blur-3xl" />
				<div className="absolute -right-40 top-40 h-[520px] w-[520px] rounded-full bg-[hsl(var(--ip-accent)/0.08)] blur-3xl" />
			</div>

			{/* Header */}
			<header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
				<div className="flex items-center gap-3">
					<div className="relative h-9 w-9">
						<div className="absolute inset-0 rounded-2xl bg-[hsl(var(--ip-primary))]" />
						<div className="absolute inset-[2px] rounded-2xl bg-zinc-950" />
						<div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[hsl(var(--ip-accent))]" />
					</div>
					<div className="leading-tight">
						<div className="text-sm font-semibold tracking-tight">inPulse</div>
						<div className="text-xs text-zinc-500">signal collectif</div>
					</div>
				</div>

				<Link
					href="/"
					className="rounded-full border border-zinc-200 bg-white/70 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-white"
				>
					Revenir
				</Link>
			</header>

			{/* Content */}
			<section className="relative mx-auto w-full max-w-6xl min-h-[80vh] px-6 pb-16 pt-6 md:pt-10">
				<div className="max-w-2xl">
					<div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs text-zinc-600 backdrop-blur">
						résultat • démo
					</div>

					<h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
						Signal obtenu
					</h1>

					<p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base">
						{q.title}{" "}
						<span className="font-medium text-zinc-900">
							({q.A.emoji} {q.A.label} / {q.B.emoji} {q.B.label})
						</span>
						<br />
						<span className="text-zinc-500">
							Pas une vérité. Pas une décision. Juste un signal partagé.
						</span>
					</p>

					<div className="mt-8 rounded-[2rem] border border-zinc-200 bg-white/75 p-7 backdrop-blur">
						<ResultRow label={`${q.A.emoji} ${q.A.label}`} value={results.A} tint="accent" />
						<div className="h-4" />
						<ResultRow label={`${q.B.emoji} ${q.B.label}`} value={results.B} tint="primary" />

						<div className="mt-6 text-xs text-zinc-500">
							Exemple de lecture : “majorité relative”, pas “consensus”.
						</div>
					</div>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Link
							href="/#booking"
							className="rounded-full bg-zinc-950 px-5 py-3 text-center text-sm font-medium text-white hover:bg-zinc-800"
						>
							Booker un InPulse pour un lieu
						</Link>
						<Link
							href="/#principes"
							className="rounded-full border border-zinc-200 bg-white/70 px-5 py-3 text-center text-sm font-medium text-zinc-900 hover:bg-white"
						>
							Lire les principes
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}

function ResultRow({
	label,
	value,
	tint,
}: {
	label: string;
	value: number;
	tint: "primary" | "accent";
}) {
	const bar =
		tint === "accent"
			? "bg-[hsl(var(--ip-accent))]"
			: "bg-[hsl(var(--ip-primary))]";

	return (
		<div>
			<div className="flex items-center justify-between text-sm">
				<span className="text-zinc-700">{label}</span>
				<span className="font-semibold text-zinc-950">{value}%</span>
			</div>
			<div className="mt-2 h-2 w-full rounded-full bg-zinc-100">
				<div className={`h-2 rounded-full ${bar}`} style={{ width: `${value}%` }} />
			</div>
		</div>
	);
}
