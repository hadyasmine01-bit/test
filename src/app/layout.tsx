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
  title: "Control and Study | Luxury Coworking & Study Lounge",
  description: "An inspiring study space created for ambitious students. Experience a quiet, comfortable environment designed to boost concentration.",
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
