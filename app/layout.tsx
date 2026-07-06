import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Cormorant_Garamond, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://andintelligence.sg"),
  title: {
    default: "AND Intelligence — Self-Awareness & Self-Discovery, Singapore",
    template: "%s · AND Intelligence",
  },
  description:
    "A Singapore self-discovery practice for regulation, relationships and resilience — grounded in DMIT profiling and honest, one-to-one conversation.",
  openGraph: {
    title: "AND Intelligence",
    description:
      "Regulate. Relate. Rise. AND know why you can. A Singapore practice for self-awareness, resilience and emotional intelligence.",
    url: "https://andintelligence.sg",
    siteName: "AND Intelligence",
    locale: "en_SG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable} ${caveat.variable}`}
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
