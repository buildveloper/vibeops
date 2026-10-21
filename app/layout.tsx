import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VibeOps | Operations automation for small business",
    template: "%s | VibeOps",
  },
  description:
    "Describe the work in plain English. VibeOps turns it into a clear, step-by-step automation plan for the tools you already use.",
  applicationName: "VibeOps",
  authors: [{ name: "VibeOps" }],
  creator: "Christopher John",
  keywords: [
    "operations automation",
    "small business automation",
    "workflow builder",
    "AI operations",
    "business process automation",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "VibeOps",
    title: "VibeOps | Operations automation for small business",
    description:
      "Describe the work in plain English. VibeOps turns it into a clear, step-by-step automation plan for the tools you already use.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeOps | Operations automation for small business",
    description:
      "Describe the work in plain English. VibeOps turns it into a clear, step-by-step automation plan for the tools you already use.",
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
      className={`${fraunces.variable} ${instrument.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full bg-paper text-ink antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
