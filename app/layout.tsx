import type { Metadata } from "next";
import { Inter, Noto_Serif_SC } from "next/font/google";
import Providers from "@/components/Providers";
import ConditionalFooter from "@/components/ConditionalFooter";
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
  title: "Theory Desk | 智性生活方式品牌",
  description:
    "Theory Desk — 智性生活方式品牌。READING.UNIVERSE 是其阅读维度的品牌延伸。2026 年成立于中国上海。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${notoSerifSC.variable}`}>
      <body className="flex min-h-screen flex-col bg-brand-bg text-brand-text">
        <Providers>
          <div className="flex flex-1 flex-col">{children}</div>
          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
