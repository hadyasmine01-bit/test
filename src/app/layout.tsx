import type { Metadata } from "next";
import { League_Spartan, Outfit } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-league-spartan",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Coworking Space : Control and Study",
  description: "An inspiring coworking space and study lounge designed for ambitious students and professionals. Experience a quiet, comfortable environment designed to boost concentration.",
  openGraph: {
    title: "Coworking Space : Control and Study",
    description: "An inspiring coworking space and study lounge designed for ambitious students and professionals.",
    siteName: "Control and Study",
    url: "https://controlandstudy.com/",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo-2-colors.png",
        width: 1024,
        height: 1024,
        alt: "Control and Study Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coworking Space : Control and Study",
    description: "An inspiring coworking space and study lounge designed for ambitious students and professionals.",
    images: ["/logo-2-colors.png"],
  },
  icons: {
    icon: "/logo-2-colors.png",
    shortcut: "/logo-2-colors.png",
    apple: "/logo-2-colors.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${leagueSpartan.variable} ${outfit.variable}`}>
      <body className="font-outfit antialiased">
        {children}
      </body>
    </html>
  );
}
