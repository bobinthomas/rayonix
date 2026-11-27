import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SniperCursor from "@/components/ui/SniperCursor";
import { RequestModalProvider } from "@/components/ui/RequestModal";
import { getSiteSettings } from "@/lib/cms/store";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  return (
    <html lang="en" className={`dark ${gordita.variable} ${gordita.className}`}>
      <body className={`${gordita.className} font-sans min-h-screen flex flex-col gap-0 min-[700px]:gap-4 bg-rayonix-canvas text-rayonix-text-primary antialiased selection:bg-rayonix-accent selection:text-white p-0 min-[700px]:p-4`}>
        <RequestModalProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#e22328] focus:text-white focus:rounded-[4px] focus:outline-none focus:ring-2 focus:ring-white focus:shadow-lg type-body font-medium"
          >
            Skip to main content
          </a>
          <SniperCursor />
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 w-full outline-none">
            {children}
          </main>
          <Footer social={settings} />
        </RequestModalProvider>
        {settings.ga4Id && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${settings.ga4Id}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${settings.ga4Id}');`}
            </Script>
          </>
        )}
        {settings.gtmId && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${settings.gtmId}');`}
          </Script>
        )}
        {settings.clarityId && (
          <Script id="clarity-init" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${settings.clarityId}");`}
          </Script>
        )}
      </body>
    </html>
  );
}
