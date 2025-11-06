import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Singapore Traffic Monitor",
  description: "Real-time traffic monitoring for Woodlands and Tuas customs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
