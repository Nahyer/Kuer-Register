import type { Metadata } from "next";
import { Poppins, Orbitron } from "next/font/google"
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import type React from "react";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
// import { MobileNotification } from "@/components/MobileNotification";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "600", "700"],
	variable: "--font-poppins",
  })
  
  const orbitron = Orbitron({
	subsets: ["latin"],
	variable: "--font-orbitron",
  })

export const metadata: Metadata = {
	title: {
		template: "%s | KUER",
		default: "KUER - Kenya University Esports Rankings",
	},
	description: "Register for KUER esports tournaments",
	icons: {
		icon: [
			{
				url: "/KUER_transparent.png",
				href: "/KUER_transparent.png",
			},
		],
	},
};
// 

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthProvider>
			<html lang="en" suppressHydrationWarning className={`${poppins.variable} ${orbitron.variable}`}>
			<body className={poppins.className}>
					<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
						<Navbar />
						{/* <MobileNotification /> */}
						<main className="min-h-screen bg-background text-foreground pt-16">
							{children}</main>
						
						<Toaster />
					</ThemeProvider>
				</body>
			</html>
		</AuthProvider>
	);
}
