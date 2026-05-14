import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "VibeOps — AI-Powered Operations Automation",
    template: "%s | VibeOps",
  },
  description:
    "Describe your messy operations in plain English and let AI turn them into automated workflows. Built for small businesses and professionals who want to work smarter.",
  keywords: [
    "operations automation",
    "AI workflows",
    "business automation",
    "workflow builder",
    "no-code automation",
  ],
  authors: [{ name: "VibeOps" }],
  openGraph: {
    title: "VibeOps — AI-Powered Operations Automation",
    description:
      "Describe your messy operations in plain English and let AI turn them into automated workflows.",
    type: "website",
    siteName: "VibeOps",
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeOps — AI-Powered Operations Automation",
    description:
      "Describe your messy operations in plain English and let AI turn them into automated workflows.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
