import type { Metadata } from "next";
import Header from "@/components/Header";
import LoginPanel from "@/components/LoginPanel";

export const metadata: Metadata = {
  title: "登录 / 注册 | READING.UNIVERSE by Theory Desk",
  description: "加入 READING.UNIVERSE 阅读社区，支持邮箱、手机号、Google 等方式登录。",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <LoginPanel />
      </main>
    </>
  );
}
