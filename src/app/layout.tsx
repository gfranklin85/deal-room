import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deal Room - Transparent Real Estate Offer Submission",
  description: "A transparent, auditable offer submission system for real estate transactions. Submit and track offers with full transparency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
