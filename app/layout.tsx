import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "OCHRID - A Daily Orthodox Companion",
  description: "An Orthodox Daily",
  keywords: ["Orthodox", "Christianity", "Saints", "Daily Reading", "Prologue", "Ochrid", "Nicholai Velimirovic"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-parchment text-ink font-serif antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow px-6 py-12">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

