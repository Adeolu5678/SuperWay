import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SuperWay Cleaning Services",
  description:
    "SuperWay Cleaning Services provides residential, commercial, and deep cleaning for homes and businesses in Ibadan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full bg-[var(--background)] font-sans text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
