import type { Metadata } from "next";
import Header from "@/components/Header";
import AISommelier from "@/components/AISommelier";

export const metadata: Metadata = {
  title: "AI 荐书 | READING.UNIVERSE by Theory Desk",
  description: "根据你的情绪与心境，AI 专属图书侍酒师为你推荐最合适的一本书。",
};

export default function AiPage() {
  return (
    <>
      <Header />
      <main className="py-16 md:py-24 lg:py-32">
        <AISommelier />
      </main>
    </>
  );
}
