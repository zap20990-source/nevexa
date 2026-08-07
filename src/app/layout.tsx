import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Nex } from "@/components/nex/Nex";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F9FA" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0D0D" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://nevexa.com"),
  title: {
    default: "NEVEXA - Todo lo que buscas, en un solo lugar",
    template: "%s | NEVEXA",
  },
  description:
    "Descubre tecnología, gaming, hogar, moda y más en NEVEXA. Envíos rápidos, compra segura y la mejor atención. Tu tienda online de confianza.",
  keywords: [
    "NEVEXA",
    "tienda online",
    "ecommerce",
    "tecnología",
    "gaming",
    "hogar",
    "moda",
    "compras online",
    "Colombia",
  ],
  authors: [{ name: "NEVEXA" }],
  creator: "NEVEXA",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "NEVEXA",
    title: "NEVEXA - Todo lo que buscas, en un solo lugar",
    description:
      "Descubre tecnología, gaming, hogar, moda y más en NEVEXA.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEVEXA - Todo lo que buscas, en un solo lugar",
    description:
      "Descubre tecnología, gaming, hogar, moda y más en NEVEXA.",
    images: ["/images/og-image.png"],
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
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen bg-dark text-gray-100 antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
          <Footer />
          <Nex />
        </Providers>
      </body>
    </html>
  );
}
