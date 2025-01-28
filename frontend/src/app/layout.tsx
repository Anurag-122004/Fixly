import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/header";
import Footer from "../components/footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fixly - Solve Urban Problems, Earn Rewards",
  description:
    "Empowering communities to identify, report, and solve urban issues like potholes, streetlight repairs, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
