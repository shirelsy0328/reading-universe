import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import HeartRating from "@/components/HeartRating";
import BookActions from "@/components/BookActions";
import CommentSection from "@/components/CommentSection";
import { getVisitorCommentsForBook } from "@/lib/mockComments";
import { getBookById } from "@/lib/books/store";

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BookPageProps) {
  const { id } = await params;
  const book = await getBookById(id);
  if (!book) return { title: "未找到书籍" };
  return {
    title: `${book.title} | READING.UNIVERSE by Theory Desk`,
    description: book.thoughts ?? `${book.title} — ${book.author}`,
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

  const visitorComments = getVisitorCommentsForBook(book.id);
  const statusLabel =
    book.status === "reading" ? "正在阅读" : book.status === "archived" ? "典藏" : "想读";

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-8 md:px-8 md:pb-32 md:pt-12 lg:px-12">
        <Link
          href="/#library"
          className="inline-flex items-center gap-2 text-sm text-brand-text/50 transition-colors hover:text-brand-accent"
        >
          ← 返回我的书房
        </Link>

        <article className="mt-8 overflow-hidden rounded-3xl bg-brand-card shadow-elegant md:mt-12">
          <div className="flex flex-col md:flex-row">
            <div className="relative aspect-[2/3] w-full shrink-0 md:w-64 lg:w-72">
              <Image
                src={book.coverUrl}
                alt={`${book.title} 封面`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 288px"
                priority
              />
            </div>

            <div className="flex flex-1 flex-col justify-center px-8 py-10 md:px-10 md:py-12 lg:px-14">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-brand-accent/10 px-3 py-1 text-xs font-medium text-brand-accent">
                  {statusLabel}
                </span>
                {book.progress && (
                  <span className="rounded-full bg-brand-bg px-3 py-1 text-xs text-brand-text/50">
                    进度 {book.progress}
                  </span>
                )}
              </div>

              <h1 className="mt-5 font-serif text-3xl font-medium text-brand-text md:text-4xl">
                {book.title}
              </h1>
              <p className="mt-3 text-base tracking-wide text-brand-text/50">{book.author}</p>

              <div className="mt-5">
                <HeartRating rating={book.rating} />
              </div>

              {book.quote && (
                <blockquote className="mt-8 font-serif text-lg italic leading-relaxed text-brand-text/70 md:text-xl">
                  「{book.quote}」
                </blockquote>
              )}

              <div className="mt-8 max-w-xs">
                <BookActions book={book} />
              </div>
            </div>
          </div>
        </article>

        {book.thoughts && (
          <section className="mt-12 md:mt-16">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-brand-accent">
              My Review
            </p>
            <h2 className="font-serif text-2xl font-medium text-brand-text md:text-3xl">
              我的书评
            </h2>
            <div className="mt-8 rounded-3xl bg-brand-card px-8 py-10 shadow-elegant md:px-12 md:py-14">
              <p className="mb-4 text-xs tracking-[0.2em] text-brand-text/40">
                THEORY DESK · 个人阅读笔记
              </p>
              <p className="text-base leading-loose text-brand-text/75 md:text-lg md:leading-loose">
                {book.thoughts}
              </p>
            </div>
          </section>
        )}

        <CommentSection bookId={book.id} visitorComments={visitorComments} />
      </main>
    </>
  );
}
