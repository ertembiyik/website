import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { loadCV } from "@/lib/mdx-loader";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export async function generateMetadata(): Promise<Metadata> {
  const cv = loadCV();

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
