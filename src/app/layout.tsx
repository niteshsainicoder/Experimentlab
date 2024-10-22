import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CalendarProvider } from "./components/ContextApi";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Personal Calendra",
  description: "A simple personal calender, Which help to manage your daily Events.", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CalendarProvider>  {children}</CalendarProvider>
      </body>
    </html>
  );
}
