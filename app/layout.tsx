import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsNewModal from "@/components/WhatsNewModal";
import { getLatestChangelog } from "@/utils/changelog";

export const metadata: Metadata = {
  title: "OCHRID - A Daily Orthodox Companion",
  description: "A Daily Orthodox Companion Based on the Prologue from Ochrid by Saint Nicholai Velimirovic",
  keywords: ["Orthodox", "Christianity", "Saints", "Daily Reading", "Prologue", "Ochrid", "Saint Nicholai Velimirovic"],
  icons: {
    icon: "/ochrid_favicon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const changelog = await getLatestChangelog();

  return (
    <html lang="en">
      <body className="bg-parchment text-ink font-serif antialiased">
        <Script
          data-goatcounter="https://ochrid.goatcounter.com/count"
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow py-12 px-4 md:px-6 lg:px-8 xl:px-12">
            {children}
          </main>
          <Footer />
        </div>
        {changelog && (
          <WhatsNewModal version={changelog.version} content={changelog.content} />
        )}
      </body>
    </html>
  );
}

