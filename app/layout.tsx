import type { Metadata } from "next";
import { Inter, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-sc",
  display: "swap",
});

export const metadata: Metadata = {
  title: "READING.UNIVERSE by Theory Desk | 我的阅读宇宙",
  description: "在字里行间，构建我的精神宇宙 — Theory Desk 个人品牌阅读档案馆",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${notoSerifSC.variable}`}>
      <body className="min-h-screen bg-brand-bg text-brand-text">{children}</body>
    </html>
  );
}
