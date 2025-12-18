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
    default: "Tanner O'Rourke",
    template: "%s — Tanner O",
  },
  description: "Portfolio of Tanner O'Rourke. Applied Software Engineer focused on AI/ML, web, and systems design.",
  applicationName: "Tanner O'Rourke Portfolio",
  creator: "Tanner O\'Rourke",
  publisher: "Tanner O\'Rourke",

  alternates: { canonical: "https://tannerorourke.dev" },
  // manifest: "/site.webmanifest",

  openGraph: {
    title: "Tanner O'Rourke - AI/ML, Web and Software Engineer",
    description: "Tanner O\'Rourke | AI/ML, web and systems engineer.",
    url: "https://tannerorourke.dev",
    siteName: "Tanner O'Rourke",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanner — AI Engineer & Software Engineer",
    description: "Tanner O\'Rourke | AI/ML, web and systems engineer.",
    images: ["./favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-video-preview": 60
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
