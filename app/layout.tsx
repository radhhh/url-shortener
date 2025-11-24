import type { Metadata } from "next";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const poppins = Poppins({ subsets: ["latin"], weight: "700", variable: '--font-heading' });

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "A simple and efficient URL shortening website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
};