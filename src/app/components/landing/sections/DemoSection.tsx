import { IphoneDemo } from "@/app/components/IphoneDemo";

export default function DemoSection() {
	return (
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
	);
}

