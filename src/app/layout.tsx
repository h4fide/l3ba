import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import { Toaster } from "@/components/ui/toaster";
import RegisterSWClient from "@/components/pwa/RegisterSWClient";

export const metadata: Metadata = {
  title: "L3ba",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5a4" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-body antialiased">
        {children}
        <RegisterSWClient />
        <Toaster />
      </body>
    </html>
  );
}
