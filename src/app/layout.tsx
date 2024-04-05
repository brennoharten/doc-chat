import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doc-Chat",
  description: "A chat to talk with you docs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="ligth">
      <body className={cn('min-h-screen font-sans antialiased grainy', inter.className)}>
        <Toaster />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
