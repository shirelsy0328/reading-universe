import Link from "next/link";
import Header from "@/components/Header";

export default function BookNotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif text-3xl text-brand-text">未找到这本书</h1>
        <p className="mt-4 text-brand-text/50">它可能尚未加入你的阅读宇宙。</p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-brand-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          返回首页
        </Link>
      </main>
    </>
  );
}
