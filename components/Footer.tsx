import Link from "next/link";
import { BRAND_FOUNDING, BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-brand-text/5 bg-brand-bg">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand-accent">
            {BRAND_NAME}
          </p>
          <p className="font-serif text-lg leading-relaxed text-brand-text/75 md:text-xl md:leading-loose">
            {BRAND_TAGLINE}
          </p>
          <p className="mt-6 text-sm tracking-wide text-brand-accent">
            {BRAND_FOUNDING}
          </p>
          <p className="mt-3 text-xs tracking-[0.15em] text-brand-text/40">
            READING<span className="text-brand-accent">.</span>UNIVERSE
            <span className="text-brand-text/25"> · 品牌阅读延伸</span>
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-brand-text/45">
          <Link href="/theory-desk" className="transition-colors hover:text-brand-accent">
            Theory Desk
          </Link>
          <Link href="/" className="transition-colors hover:text-brand-accent">
            阅读宇宙
          </Link>
          <Link href="/login" className="transition-colors hover:text-brand-accent">
            登录 / 注册
          </Link>
          <Link href="/ai" className="transition-colors hover:text-brand-accent">
            AI 荐书
          </Link>
        </div>

        <p className="mt-10 text-center text-[10px] text-brand-text/30">
          © {new Date().getFullYear()} Theory Desk. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
