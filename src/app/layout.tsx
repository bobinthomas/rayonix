import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rayonix.com"),
  title: {
    default: "Rayonix — The Future of Defence Is Integrated",
    template: "%s | Rayonix Defence Technologies",
  },
  description:
    "Rayonix delivers next-generation integrated autonomous defence solutions across Subsurface, Surface, and Aerial operational domains. In(visible) Warfare.",
  keywords: [
    "Rayonix",
    "Defence Tech",
    "Autonomous Systems",
    "Subsurface Defense",
    "Surface Warfare",
    "Aerial Drones",
    "Integrated Defence Ecosystem",
  ],
  authors: [{ name: "Rayonix Tech Private Limited" }],
  creator: "Rayonix Tech",
  publisher: "Rayonix Tech Private Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rayonix.com",
    siteName: "Rayonix",
    title: "Rayonix — The Future of Defence Is Integrated",
    description:
      "Next-generation integrated autonomous defence solutions across Subsurface, Surface, and Aerial domains.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rayonix — The Future of Defence Is Integrated",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rayonix — The Future of Defence Is Integrated",
    description:
      "Next-generation integrated autonomous defence solutions across Subsurface, Surface, and Aerial domains.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#080f12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="min-h-screen flex flex-col gap-4 bg-rayonix-canvas text-rayonix-text-primary antialiased selection:bg-rayonix-accent selection:text-white p-4">
        <Header />
        <div className="flex-1 w-full">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
