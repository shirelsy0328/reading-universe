import Link from "next/link";
import BookCover from "@/components/BookCover";
import { getBooks } from "@/lib/books/store";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

const statusLabel = {
  reading: "正在阅读",
  archived: "典藏",
  "want-to-read": "想读",
} as const;

export default async function AdminPage() {
  const books = await getBooks();

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-brand-text">书籍管理</h2>
          <p className="mt-2 text-sm text-brand-text/50">
            共 {books.length} 本书 · 编辑后会同步到前台 READING.UNIVERSE
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/books/new"
            className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            添加新书
          </Link>
          <AdminLogoutButton />
        </div>
      </div>

      <div className="space-y-4">
        {books.map((book) => (
          <article
            key={book.id}
            className="flex gap-4 rounded-2xl bg-brand-card p-4 shadow-elegant md:gap-6 md:p-5"
          >
            <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg md:h-28 md:w-20">
              <BookCover
                src={book.coverUrl}
                alt={book.title}
                fill
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-accent/10 px-2.5 py-0.5 text-[10px] text-brand-accent">
                  {statusLabel[book.status]}
                </span>
                <span className="text-xs text-brand-text/40">评分 {book.rating}</span>
              </div>
              <h3 className="mt-2 truncate font-serif text-lg text-brand-text">{book.title}</h3>
              <p className="truncate text-sm text-brand-text/50">{book.author}</p>
            </div>
            <div className="flex items-center">
              <Link
                href={`/admin/books/${book.id}`}
                className="rounded-full bg-brand-bg px-4 py-2 text-sm text-brand-text/70 transition-colors hover:text-brand-accent"
              >
                编辑
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
