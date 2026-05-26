import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Newsreader, Roboto_Flex } from "next/font/google";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

import AppProvider from "@/components/navigation/AppProvider";
import { ThemeProvider } from "@/components/navigation/ThemeProvider";

import { lightTheme, darkTheme } from "@/lib/theme/theme.css";
import './global.css';
import './global.styles.css';
import 'katex/dist/katex.min.css';


const robotoFlex = Roboto_Flex({
  style: "normal",
  variable: "--font-display",
  subsets: ["latin"]
});

const newsreader = Newsreader({
  style: "normal",
  variable: "--font-serif",
  subsets: ["latin"]
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"]
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

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
  verification: {
    google: process.env.NEXT_PUBLIC_GSV
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


export default async function RootLayout({ 
  children,
}: Readonly<{ 
  children: React.ReactNode; 
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const theme = themeCookie === "dark" ? "dark" : "light";
  const themeClass = theme === "dark" ? darkTheme : lightTheme;

  return (
    <html
      lang="en"
      className={`${themeClass} ${robotoFlex.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
      data-theme={theme}
    >
      <body>
        <ThemeProvider initialTheme={theme} hasCookie={!!themeCookie}>
          <AppProvider>
              {children}
              <Analytics />
              <SpeedInsights />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
