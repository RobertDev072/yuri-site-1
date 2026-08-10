import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

// Editorial display face for headlines — bold/black geometric-humanist
// character used as a design element in its own right (the "confident
// agency" look), self-hosted at build time via next/font (no runtime
// Google Fonts request).
const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

// Clean, highly legible workhorse sans for body copy, nav, buttons, forms.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SG Onderneming — Bouw & Verduurzaming | Van A tot Z geregeld",
  description:
    "SG Onderneming verzorgt zonnepanelen, thuisbatterijen, laadoplossingen, dakrenovatie en verbouwingen in heel Nederland. Vakmanschap, betrouwbaarheid en kwaliteit — van A tot Z geregeld.",
  keywords: [
    "zonnepanelen",
    "thuisbatterij",
    "laadpaal",
    "dakrenovatie",
    "verbouwing",
    "vogelwering",
    "SG Onderneming",
  ],
  icons: {
    icon: "/images/brand/logo.jpg",
  },
  openGraph: {
    title: "SG Onderneming — Bouw & Verduurzaming",
    description:
      "Van A tot Z geregeld: zonnepanelen, thuisbatterijen, laadoplossingen en meer. Actief in heel Nederland.",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl"
      className={`h-full antialiased ${bricolageGrotesque.variable} ${inter.variable}`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
