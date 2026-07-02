import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import {
  BRAND_FOUNDING,
  BRAND_MISSION,
  BRAND_POSITIONING,
  BRAND_TAGLINE,
} from "@/lib/brand";

export const metadata: Metadata = {
  title: "Theory Desk | 智性生活方式品牌",
  description:
    "Theory Desk — 以阅读、思考与审美为内核的智性生活方式品牌。2026 年成立于中国上海。",
};

const offerings = [
  {
    title: "READING.UNIVERSE",
    subtitle: "阅读宇宙 · 品牌世界观延伸",
    description:
      "Theory Desk 在书籍与文字维度的实践。记录阅读、分享思考，以 AI 图书侍酒师连接每一本触动人心的书。",
    href: "/",
    cta: "进入阅读宇宙",
  },
  {
    title: "Coming Soon",
    subtitle: "智性生活 · 更多可能",
    description:
      "线下空间、生活方式选品与品牌刊物正在筹备中。Theory Desk 将持续拓展智性生活的边界。",
    href: null,
    cta: "敬请期待",
  },
];

export default function TheoryDeskPage() {
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24 lg:px-12 lg:pb-32 lg:pt-32">
          <div className="max-w-3xl">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-brand-accent">
              Intellectual Lifestyle Brand
            </p>
            <h1 className="font-serif text-4xl font-medium leading-tight text-brand-text md:text-5xl lg:text-6xl">
              Theory Desk
            </h1>
            <p className="mt-4 text-sm tracking-[0.15em] text-brand-text/45">
              {BRAND_POSITIONING} · {BRAND_FOUNDING}
            </p>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-brand-text/65 md:text-lg md:leading-loose">
              {BRAND_MISSION}
            </p>
          </div>
        </section>

        <section
          id="philosophy"
          className="mx-auto max-w-7xl px-6 pb-24 md:px-8 md:pb-32 lg:px-12"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-brand-accent">
            Philosophy
          </p>
          <h2 className="font-serif text-3xl font-medium text-brand-text md:text-4xl">
            品牌理念
          </h2>
          <div className="mt-10 max-w-3xl rounded-3xl bg-brand-card px-8 py-10 shadow-elegant md:px-12 md:py-14">
            <p className="font-serif text-xl leading-relaxed text-brand-text/80 md:text-2xl md:leading-loose">
              {BRAND_TAGLINE}
            </p>
            <p className="mt-8 text-sm leading-relaxed text-brand-text/55 md:text-base md:leading-loose">
              Theory Desk 相信，智性不是一种姿态，而是一种日常的生活方式——
              在好书里深耕，在思考中沉淀，在审美里安顿自己。我们不追逐喧嚣，
              只愿为每一位渴望精神成长的读者，建造一处可以栖息的桌面。
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-8 md:pb-32 lg:px-12 lg:pb-40">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-brand-accent">
            Universe
          </p>
          <h2 className="font-serif text-3xl font-medium text-brand-text md:text-4xl">
            品牌宇宙
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-brand-text/50 md:text-base">
            READING.UNIVERSE 是 Theory Desk 品牌世界观的重要组成部分，而非独立品牌。
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
            {offerings.map((item) => (
              <article
                key={item.title}
                className="flex flex-col rounded-3xl bg-brand-card px-8 py-10 shadow-elegant md:px-10 md:py-12"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-brand-accent">
                  {item.subtitle}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-medium text-brand-text">
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-text/60 md:text-base md:leading-loose">
                  {item.description}
                </p>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="mt-8 inline-flex w-fit rounded-full bg-brand-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    {item.cta}
                  </Link>
                ) : (
                  <span className="mt-8 inline-flex w-fit rounded-full bg-brand-bg px-6 py-3 text-sm text-brand-text/40">
                    {item.cta}
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
