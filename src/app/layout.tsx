import type { Metadata } from "next";
import { League_Spartan, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Control and Study | Premium Coworking Space in Monastir",
  description: "Control and Study is a modern coworking space in Monastir offering open spaces, labs, 24/7 access, coffee and professional facilities.",
  keywords: "Control and Study, CTRL S, coworking space, Monastir, Tunisia, shared office, study lab, open space, meeting rooms, productivity, premium coworking",
  authors: [{ name: "Control and Study" }],
  openGraph: {
    title: "Control and Study | Premium Coworking Space in Monastir",
    description: "Save Your Progress. Discover a modern and luxury coworking space designed for productivity, collaboration, and learning in Monastir, Tunisia.",
    url: "https://controlandstudy.com",
    siteName: "Control and Study",
    images: [
      {
        url: "/assets/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Control and Study Coworking Space",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Control and Study | Premium Coworking Space in Monastir",
    description: "Control and Study is a modern coworking space in Monastir offering open spaces, labs, 24/7 access, coffee and professional facilities.",
    images: ["/assets/hero-bg.jpg"],
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
      className={`${outfit.variable} ${playfair.variable} ${leagueSpartan.variable} scroll-smooth h-full antialiased`}
    >
      <body className="bg-dark-bg text-brand-blue font-sans selection:bg-brand-orange selection:text-white min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
