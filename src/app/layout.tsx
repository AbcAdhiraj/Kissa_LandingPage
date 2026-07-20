import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope, Poppins } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-devanagari",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KISSA — Everybody has a Kissa worth keeping.",
  description:
    "Kissa helps you preserve your life story through conversations, voice notes, photos, and memories. So future generations can experience who you really were.",
  openGraph: {
    title: "KISSA — Preserve Your Story",
    description:
      "Every family has stories worth keeping. Kissa helps you preserve them.",
    type: "website",
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
      className={`${plusJakarta.variable} ${manrope.variable} ${poppins.variable}`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
