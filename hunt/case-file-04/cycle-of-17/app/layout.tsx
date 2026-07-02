import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cycle of 17 | CF-04-AB-2903 — Crimson Carnival",
  description:
    "A haunted Ferris wheel operates on a 17-year cycle. Decode the pattern before it vanishes. Crimson Carnival Case File CF-04-AB-2903.",
  keywords: ["puzzle", "cipher", "ferris wheel", "carnival", "mystery", "CF-04-AB-2903"],
  openGraph: {
    title: "Cycle of 17 | Crimson Carnival",
    description: "Decode the haunted Ferris wheel's 17-step cipher.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistMono.variable} antialiased bg-[#0a0008]`}>
        {children}
      </body>
    </html>
  );
}
