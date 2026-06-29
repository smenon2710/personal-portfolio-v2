import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
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
  metadataBase: new URL("https://personal-portfolio-smenon2710.vercel.app"),
  openGraph: {
    title: "Sujithkumar Menon | Analytics & AI Product Manager",
    description:
      "Analytics & BI leader with 14+ years building enterprise data products, self-service BI ecosystems, and AI-powered experiences.",
    url: "https://personal-portfolio-smenon2710.vercel.app",
    siteName: "Sujithkumar Menon Portfolio",
    images: [
      {
        url: "/sujith-profile.png",
        width: 260,
        height: 260,
        alt: "Sujithkumar Menon",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sujithkumar Menon | Analytics & AI Product Manager",
    description:
      "Analytics & BI leader with 14+ years building enterprise data products, self-service BI ecosystems, and AI-powered experiences.",
    images: ["/sujith-profile.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${dmSans.variable} font-sans bg-paper text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
