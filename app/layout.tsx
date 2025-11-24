import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-heading",
});

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
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans p-8 h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
