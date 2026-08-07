import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

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
    icon: "/images/logo.jpg",
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
    <html lang="nl" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
