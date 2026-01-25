// import { GoogleOAuthProvider } from "@react-oauth/google"
import { Geist } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

import { ErrorBoundary } from "@/components/providers/error-boundary";
import { Redux } from "@/components/providers/redux";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adflow.ai - Ads management simplified",
  description:
    "Streamline your advertising campaigns with Adflow.ai – the all-in-one platform for creating, managing, and optimizing ads across channels. Boost ROI with AI-driven insights, real-time analytics, and collaborative workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} antialiased`}>
        <ErrorBoundary>
          <Redux>
            {children}
            <Toaster position="top-right" />
          </Redux>
        </ErrorBoundary>
      </body>
    </html>
  );
}
