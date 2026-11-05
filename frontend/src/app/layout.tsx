import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const bebas = Bebas_Neue({ variable: "--font-bebas", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ABHIJAYFLIX · Abhijay Krishnan",
    template: "%s · ABHIJAYFLIX",
  },
  description:
    "Abhijay Krishnan: B.Tech Computer Engineering student at NMIMS Mumbai. Software Engineer, Java Backend Developer, DevOps Enthusiast and AI/ML Developer. Now streaming projects, internships and skills.",
  authors: [{ name: "Abhijay Krishnan", url: "https://github.com/ABHIJAYAMITKRISHNAN" }],
  creator: "Abhijay Krishnan",
  keywords: [
    "Abhijay Krishnan",
    "ABHIJAYFLIX",
    "portfolio",
    "NMIMS Mumbai",
    "Computer Engineering",
    "Java",
    "Spring Boot",
    "DevOps",
    "AI/ML",
  ],
  openGraph: {
    type: "website",
    siteName: "ABHIJAYFLIX",
    title: "ABHIJAYFLIX · Abhijay Krishnan",
    description:
      "Netflix-inspired developer portfolio of Abhijay Krishnan, B.Tech Computer Engineering at NMIMS Mumbai.",
  },
  twitter: {
    card: "summary",
    title: "ABHIJAYFLIX · Abhijay Krishnan",
    description: "Netflix-inspired developer portfolio of Abhijay Krishnan, B.Tech Computer Engineering at NMIMS Mumbai.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable} antialiased`}>
      <body className="min-h-dvh bg-flix-black font-sans text-white">{children}</body>
    </html>
  );
}
