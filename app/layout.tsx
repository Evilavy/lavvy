import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Studio Lavvy — Sites web qui convertissent",
  description:
    "Studio Lavvy conçoit des sites web clairs, rapides et efficaces pour les entreprises ambitieuses. Stratégie, UX/UI design, développement et SEO — tout pour transformer vos visiteurs en clients.",
  keywords: [
    "agence web",
    "création site web",
    "UX UI design",
    "développement web",
    "SEO",
    "Studio Lavvy",
  ],
  authors: [{ name: "Studio Lavvy" }],
  creator: "Studio Lavvy",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Studio Lavvy — Sites web qui convertissent",
    description:
      "On conçoit des sites clairs, rapides et efficaces pour les entreprises qui veulent être visibles et convertir en ligne.",
    siteName: "Studio Lavvy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Lavvy — Sites web qui convertissent",
    description:
      "On conçoit des sites clairs, rapides et efficaces pour les entreprises qui veulent être visibles et convertir en ligne.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
