export default function BookingSection() {
	return (
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
	);
}

