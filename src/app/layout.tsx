import type { Metadata, Viewport } from "next";
import { Inter_Tight, Roboto_Flex } from "next/font/google";
import './global.css';
import { layoutRoot, layoutShell, layoutMain } from "@/lib/theme/appShell.css"
import Sidebar from "@/components/navigation/Sidebar";
/**
 * Define Metadata, theme, and providers
 */

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
}

export const metadata: Metadata = {
  metadataBase: new URL("https://tannerorourke.dev"),
  title: {
    default: "Tanner O'Rourke — AI/ML Engineer, Web Developer, and Software Engineer",
    template: "%s — Tanner",
  },
  description: "Portfolio of Tanner O'Rourke. Applied AI/ML Engineer, end-to-end Web Developer, and production-grade Software Engineer.",
  applicationName: "Tanner O'Rourke Portfolio",

  // Help Google understand the canonical URL for each route
  alternates: { canonical: "/" },

  // Social sharing cards
  openGraph: {
    type: "website",
    url: "/",
    title: "Tanner — AI Engineer & Software Engineer",
    description: "Applied AI/ML, end-to-end systems, and production-grade software engineering.",
    siteName: "Tanner O'Rourke",
    images: [
      {
        url: "/og.jpg", // 1200x630
        width: 1200,
        height: 630,
        alt: "Tanner O'Rourke Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanner — AI Engineer & Software Engineer",
    description: "Applied AI/ML, end-to-end systems, and production-grade software engineering.",
    images: ["/favicon.jpg"],
  },

  // Favicons and app icons (place files in /public)
  icons: {
    icon: [
      { url: "/favicon.jpg", sizes: "16x16", type: "image/jpg" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${layoutRoot} ${interTight.variable} ${robotoFlex.variable}`}>
        <div className={layoutShell}>
          <Sidebar />
          <main className={layoutMain}>{children}</main>
        </div>
      </body>
    </html>
  );
}
