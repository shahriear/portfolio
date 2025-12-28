import React from "react";

import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/components/ui/Toast";
import AnalyticsScripts from "@/components/AnalyticsScripts"; // GA4 + FB Pixel 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://tamimalhridoy.com"
  ),
  title: {
    default: "Shuvo — Full-Stack Developer",
    template: "%s | Shahriear Shuvo",
  },
  description:
    "Full-stack developer portfolio. Next.js, Node.js, branding and more.",
  openGraph: {
    type: "website",
    url: "/",
    title: "Tamim Al Hridoy — Full-Stack Developer",
    description: "Full-stack developer portfolio.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "/" },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0f1a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " min-h-screen flex flex-col"}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Analytics */}
          <AnalyticsScripts />
          {/* Toast */}
          <ToastProvider>
            <CurrencyProvider>
              <AuthProvider>
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <ChatWidget />
              </AuthProvider>
            </CurrencyProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
