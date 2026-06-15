import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Clean, modern body type.
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

// Elegant, readable headline type.
const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

const SITE_URL = "https://spawn.icu";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Spawn: Custom Websites For Real Businesses",
    template: "%s · Spawn"
  },
  description:
    "Spawn builds custom websites for real businesses, with hosting, domains, branding and ongoing support. Call 717-750-7441 or email dom@spawn.icu.",
  keywords: [
    "web design",
    "custom websites",
    "website redesign",
    "hosting",
    "VPS management",
    "branding",
    "business automation",
    "Spawn"
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Spawn: Custom Websites For Real Businesses",
    description:
      "Custom websites, hosting, domains, branding and support for your business.",
    siteName: "Spawn"
  },
  twitter: {
    card: "summary_large_image",
    title: "Spawn: Custom Websites For Real Businesses",
    description:
      "Custom websites, hosting, domains, branding and support for your business."
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable}`}
    >
      <head>
        <script
          // Apply saved theme before paint to avoid a flash.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('spawn-theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`
          }}
        />
      </head>
      <body className="font-sans antialiased bg-paper text-ink">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
