import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SniperCursor from "@/components/ui/SniperCursor";
import "./globals.css";

const gordita = localFont({
  src: [
    {
      path: "../../public/fonts/Gordita-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gordita-Light-Italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/Gordita-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gordita-Regular-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Gordita-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gordita-Medium-Italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/Gordita-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gordita-Bold-Italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/Gordita-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gordita-Black-Italic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
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
  icons: {
    icon: [
      { url: "/assets/rayonix-header-logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/assets/rayonix-header-logo.png" },
    ],
  },
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
    <html lang="en" className={`dark ${gordita.variable} ${gordita.className}`}>
      <body className={`${gordita.className} font-sans min-h-screen flex flex-col gap-0 min-[700px]:gap-4 bg-rayonix-canvas text-rayonix-text-primary antialiased selection:bg-rayonix-accent selection:text-white p-0 min-[700px]:p-4`}>
        <SniperCursor />
        <Header />
        <div className="flex-1 w-full">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
