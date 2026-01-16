import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import { ErrorBoundary } from "@/components/providers/error-boundary";
import { Redux } from "@/components/providers/redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adflow.ai - Ads management simplified",
  description: "",
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
          <Redux>{children}</Redux>
        </ErrorBoundary>
      </body>
    </html>
  );
}
