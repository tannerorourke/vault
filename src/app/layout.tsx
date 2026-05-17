import type { Metadata, Viewport } from "next";
import { Inter_Tight, Roboto_Flex } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

import AppProvider from "@/components/navigation/AppProvider";
import { ThemeProvider } from "@/components/navigation/ThemeProvider";
import FloatingToolbar from "@/components/navigation/FloatingToolbar";

import { lightTheme } from "@/lib/theme/theme.css";
import './global.css';
import './global.styles.css';


const interTight = Inter_Tight({
  style: "normal",
  variable: "--font-body",
  subsets: ["latin"]
});

const robotoFlex = Roboto_Flex({
  style: "normal",
  variable: "--font-display",
  subsets: ["latin"]
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Tanner O\'Rourke",
    template: "%s - Tanner O",
  },
  description: "Tanner O\'Rourke | selected ML and web Engineering work.",
  applicationName: "Tanner O\'Rourke Portfolio",
  creator: "Tanner O\'Rourke",
  publisher: "Tanner O\'Rourke",

  alternates: { canonical: SITE_URL },
  manifest: "/manifest.webmanifest",

  openGraph: {
    title: "Tanner O'Rourke",
    description: "Tanner O\'Rourke | AI/ML, web and systems engineer.",
    url: SITE_URL,
    siteName: "Tanner O'Rourke",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-video-preview": 60,
      "max-image-preview": "large",
    },
  },
};


export default function RootLayout({ 
  children,
}: Readonly<{ 
  children: React.ReactNode; 
}>) {
  return (
    <html lang="en" className={lightTheme}>
      <body className={`${interTight.variable} ${robotoFlex.variable}`}>
        <ThemeProvider>
          <AppProvider>
              {children}
              <FloatingToolbar />
              <Analytics />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
