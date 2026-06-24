import type { Metadata } from "next";
import { Cinzel, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cliftonuae.com"),
  title: "Greenz by Danube | Clifton Capital",
  description:
    "Greenz by Danube — own a fully furnished Dubai townhouse from AED 3.5M, paid 1% monthly. A green, low-density community beside Dubai Silicon Oasis. Freehold, Golden Visa eligible, handover Q4 2029. Guided by Clifton Capital Real Estate LLC.",
  openGraph: {
    title: "Greenz by Danube · Furnished Dubai Townhouses | Clifton Capital",
    description:
      "Fully furnished, Italian-finished townhouses beside Dubai Silicon Oasis. From AED 3.5M, paid 1% monthly. Handover Q4 2029.",
    siteName: "Clifton Capital Real Estate",
    images: ["/logo.png"],
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
      className={`${cinzel.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
