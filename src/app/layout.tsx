import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const fontCal = localFont({
  display: "swap",
  src: "./font/CalSans-SemiBold.otf",
  variable: "--font-cal",
});

export const metadata: Metadata = {
  description: "A backend and devsecops enthusiast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontCal.variable} antialiased`}>{children}</body>
    </html>
  );
}
