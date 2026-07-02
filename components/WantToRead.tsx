import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/mockData";
import HeartRating from "@/components/HeartRating";
import BookActions from "@/components/BookActions";

interface WantToReadProps {
  books: Book[];
}

export default function WantToRead({ books }: WantToReadProps) {
  if (books.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
      <div className="mb-12 md:mb-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-brand-accent">
          Want to Read
        </p>
        <h2 className="font-serif text-3xl font-medium text-brand-text md:text-4xl">
          想读
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4 lg:gap-10">
        {books.map((book) => (
          <article
            key={book.id}
            className="group transition-all duration-300 hover:-translate-y-2"
          >
            <div className="overflow-hidden rounded-2xl bg-brand-card shadow-elegant transition-shadow duration-300 group-hover:shadow-elegant-hover">
              <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                  src={book.coverUrl}
                  alt={`${book.title} 封面`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="px-4 py-5 md:px-5 md:py-6">
                <Link
                  href={`/books/${book.id}`}
                  className="font-serif text-base font-medium leading-snug text-brand-text transition-colors hover:text-brand-accent md:text-lg"
                >
                  {book.title}
                </Link>
                <p className="mt-2 text-xs tracking-wide text-brand-text/50 md:text-sm">
                  {book.author}
                </p>
                <div className="mt-3">
                  <HeartRating rating={book.rating} size="sm" />
                </div>
                {book.quote && (
                  <blockquote className="mt-3 line-clamp-2 font-serif text-xs italic leading-relaxed text-brand-text/65">
                    「{book.quote}」
                  </blockquote>
                )}
                <BookActions book={book} compact />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
