import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppCTA from "@/components/WhatsAppCTA";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "One'O'One Agency | The Creative Marketing Powerhouse",
  description: "One'O'One Agency is a premier marketing and creative agency. We combine data-driven strategies, cutting-edge creative design, and scale solutions to grow your business.",
  keywords: ["marketing agency", "creative agency", "digital strategy", "branding", "performance marketing", "design studio"],
  openGraph: {
    title: "One'O'One Agency | The Creative Marketing Powerhouse",
    description: "Data-driven, creative-first marketing agency accelerating digital growth.",
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
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-dark text-gray-100 selection:bg-brand-violet/30 selection:text-brand-blue">
        <div className="noise-bg" />
        {children}
        <WhatsAppCTA />
      </body>
    </html>
  );
}
