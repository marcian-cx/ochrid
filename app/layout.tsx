import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsNewModal from "@/components/WhatsNewModal";
import { getLatestChangelog } from "@/utils/changelog";
import { ThemeProvider } from "@/lib/ThemeContext";

const siteUrl = "https://ochrid.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Prologue from Ochrid - Free English Translation | St. Nikolai Velimirović",
    template: "%s | Prologue from Ochrid",
  },
  description: "The first faithful, uncensored, and free English translation of the Prologue from Ochrid by St. Nikolai Velimirović. Daily Orthodox readings, lives of saints, hymns, and homilies for every day of the year.",
  keywords: [
    "Prologue from Ochrid",
    "Prologue of Ochrid", 
    "Prologue from Ohrid",
    "Prologue of Ohrid",
    "St. Nikolai Velimirovic",
    "Saint Nikolai Velimirović",
    "Bishop Nikolai",
    "Orthodox daily readings",
    "Lives of the Saints",
    "Orthodox Christianity",
    "Ohridski Prolog",
    "Orthodox calendar",
    "Orthodox saints",
    "Serbian Orthodox",
    "Eastern Orthodox",
    "Daily devotional Orthodox",
  ],
  authors: [
    { name: "St. Nikolai Velimirović", url: "https://en.wikipedia.org/wiki/Nikolaj_Velimirovi%C4%87" },
    { name: "Rdr. Marcian Sakarya" },
  ],
  creator: "Rdr. Marcian Sakarya",
  publisher: "OCHRID.COM",
  icons: {
    icon: "/ochrid_favicon.png",
    apple: "/ochrid_favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Prologue from Ochrid",
    title: "Prologue from Ochrid - Free English Translation by St. Nikolai Velimirović",
    description: "The first faithful, uncensored, and free English translation of the Prologue from Ochrid. Daily Orthodox readings, lives of saints, hymns, and homilies.",
    images: [
      {
        url: "/ochrid_favicon.png",
        width: 512,
        height: 512,
        alt: "Prologue from Ochrid",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Prologue from Ochrid - Free English Translation",
    description: "The first faithful, uncensored English translation of the Prologue from Ochrid by St. Nikolai Velimirović. Free daily Orthodox readings.",
    images: ["/ochrid_favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Religion",
  classification: "Orthodox Christianity",
  verification: {
    google: "hcbILvir7vFh6oNVPgjRgq-BRk8FXjCAGhgUTegvvIA",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://ochrid.com/#website",
      "url": "https://ochrid.com",
      "name": "Prologue from Ochrid",
      "description": "The first faithful, uncensored, and free English translation of the Prologue from Ochrid by St. Nikolai Velimirović",
      "publisher": { "@id": "https://ochrid.com/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://ochrid.com/readings/{search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "Organization",
      "@id": "https://ochrid.com/#organization",
      "name": "OCHRID.COM",
      "url": "https://ochrid.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ochrid.com/ochrid_favicon.png"
      },
      "sameAs": []
    },
    {
      "@type": "Book",
      "@id": "https://ochrid.com/#book",
      "name": "Prologue from Ochrid",
      "alternateName": ["Prologue of Ochrid", "Prologue from Ohrid", "Prologue of Ohrid", "Ohridski Prolog"],
      "author": {
        "@type": "Person",
        "name": "St. Nikolai Velimirović",
        "alternateName": ["Saint Nikolai Velimirovic", "Bishop Nikolai of Ohrid and Žiča", "Николај Велимировић"],
        "birthDate": "1881-01-05",
        "deathDate": "1956-03-18",
        "nationality": "Serbian",
        "jobTitle": "Bishop of Ohrid and Žiča",
        "sameAs": "https://en.wikipedia.org/wiki/Nikolaj_Velimirovi%C4%87"
      },
      "inLanguage": ["en", "sr"],
      "genre": ["Religious literature", "Orthodox Christianity", "Hagiography", "Devotional literature"],
      "about": [
        { "@type": "Thing", "name": "Orthodox Christianity" },
        { "@type": "Thing", "name": "Saints" },
        { "@type": "Thing", "name": "Daily devotional" }
      ],
      "description": "A collection of lives of saints, hymns, reflections, contemplations, and homilies for every day of the year, written by St. Nikolai Velimirović, Bishop of Ohrid and Žiča.",
      "publisher": { "@id": "https://ochrid.com/#organization" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://ochrid.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://ochrid.com"
        }
      ]
    }
  ]
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const changelog = await getLatestChangelog();

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-parchment text-ink font-serif antialiased">
        <Script
          data-goatcounter="https://ochrid.goatcounter.com/count"
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header version={changelog?.version} />
            <main className="flex-grow py-12 px-4 md:px-6 lg:px-8 xl:px-12">
              {children}
            </main>
            <Footer />
          </div>
          {changelog && (
            <WhatsNewModal version={changelog.version} content={changelog.content} />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}

