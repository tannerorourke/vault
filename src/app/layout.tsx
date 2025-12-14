import type { Metadata } from "next";
import { Inter_Tight, Roboto_Flex } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

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

export const metadata: Metadata = {
  title: "Tanner O'Rourke",
  description: "AI/ML Engineer, Web Developer, and Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} ${robotoFlex.variable}`}>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
