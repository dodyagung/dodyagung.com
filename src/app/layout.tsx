import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const fontCal = localFont({
  display: "swap",
  src: "./font/CalSans-SemiBold.otf",
  variable: "--font-cal",
});

export const metadata: Metadata = {
  description: "A backend enthusiast. Loves Golang and Typescript.",
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
