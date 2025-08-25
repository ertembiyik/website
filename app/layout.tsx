import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { loadCVSync } from "@/lib/static-data-loader";

export const dynamic = 'force-static';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export function generateMetadata(): Metadata {
  const cv = loadCVSync();

  return {
    metadataBase: new URL('https://ertembiyik.com'),
    title: cv.general.displayName,
    description: cv.general.byline,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
