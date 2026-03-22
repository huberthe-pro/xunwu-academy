import type { Metadata } from "next";
import { Noto_Serif_SC, Geist } from "next/font/google";
import "./globals.css";

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "寻吾书院 - 中国传统文化",
  description: "发现与传承中国传统文化之美",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${notoSerifSC.variable} ${geistSans.variable} antialiased min-h-screen flex flex-col font-serif`}>
        {children}
      </body>
    </html>
  );
}
