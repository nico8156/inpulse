import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "inPulse",
	description: "Capteur de ressenti collectif — un signal clair, rien de plus.",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="fr">
			<body>{children}</body>
		</html>
	);
}
