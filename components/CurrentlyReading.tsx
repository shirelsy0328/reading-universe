import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/mockData";
import HeartRating from "@/components/HeartRating";
import BookActions from "@/components/BookActions";

interface CurrentlyReadingProps {
  books: Book[];
}

export default function CurrentlyReading({ books }: CurrentlyReadingProps) {
  if (books.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
      <div className="mb-12 md:mb-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-brand-accent">
          Currently Reading
        </p>
        <h2 className="font-serif text-3xl font-medium text-brand-text md:text-4xl">
          正在阅读
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:gap-8">
        {books.map((book) => (
          <article
            key={book.id}
            className="group flex flex-col overflow-hidden rounded-2xl bg-brand-card shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant-hover"
          >
            <div className="relative aspect-[2/3] overflow-hidden">
              <Image
                src={book.coverUrl}
                alt={`${book.title} 封面`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority
              />
            </div>

            <div className="flex flex-1 flex-col px-3 py-4 md:px-4 md:py-5">
              {book.progress && (
                <span className="mb-2 inline-flex w-fit rounded-full bg-brand-accent/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-brand-accent md:mb-3 md:px-2.5 md:py-1 md:text-xs">
                  {book.progress}
                </span>
              )}

              <Link
                href={`/books/${book.id}`}
                className="font-serif text-sm font-medium leading-snug text-brand-text transition-colors hover:text-brand-accent md:text-base lg:text-lg"
              >
                {book.title}
              </Link>
              <p className="mt-1 text-[11px] tracking-wide text-brand-text/50 md:text-xs">
                {book.author}
              </p>

              <div className="mt-2 md:mt-3">
                <HeartRating rating={book.rating} size="sm" />
              </div>

              {book.quote && (
                <blockquote className="mt-2 line-clamp-2 font-serif text-[10px] italic leading-relaxed text-brand-text/65 md:mt-3 md:text-xs">
                  「{book.quote}」
                </blockquote>
              )}

              <BookActions book={book} compact />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
