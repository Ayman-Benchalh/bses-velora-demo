import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VELORA | Haute Confection & Mode Contemporaine",
  description:
    "Maison de haute confection contemporaine. L'alliance de l'élégance sartoriale européenne et du raffinement artisanal marocain. Démonstration e-commerce par BSES.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

