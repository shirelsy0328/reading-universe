export default function Hero() {
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:px-8 md:pb-32 md:pt-24 lg:px-12 lg:pb-40 lg:pt-32"
    >
      <div className="max-w-3xl">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-brand-accent">
          Personal Reading Archive
        </p>
        <h1 className="font-serif text-4xl font-medium leading-tight text-brand-text text-balance md:text-5xl lg:text-6xl lg:leading-[1.15]">
          在字里行间，构建我的精神宇宙
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-brand-text/65 md:mt-10 md:text-lg md:leading-loose">
          这里是属于阅读者的私人空间。我记录每一本触动心灵的书，分享正在读的文字与思考，
          也期待与你在书页之间相遇，一同探索那些塑造我们灵魂的故事与思想。
        </p>
      </div>
    </section>
  );
}
