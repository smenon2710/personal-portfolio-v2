import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sujithkumar Menon | Analytics & AI Product Manager",
  description:
    "Portfolio of Sujithkumar Menon, Analytics Product Manager specializing in BI, GenAI, and data platforms.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${dmSans.variable} font-sans bg-slate-50 text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}