import { notFound } from "next/navigation";
import Link from "next/link";
import { getBookById } from "@/lib/books/store";
import AdminBookForm from "@/components/admin/AdminBookForm";

interface AdminBookEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminBookEditPage({ params }: AdminBookEditPageProps) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

  return (
    <div>
      <Link href="/admin" className="text-sm text-brand-text/50 transition-colors hover:text-brand-accent">
        ← 返回书籍列表
      </Link>
      <h2 className="mt-6 font-serif text-2xl text-brand-text">编辑《{book.title}》</h2>
      <p className="mt-2 text-sm text-brand-text/50">修改封面、评分、书评等内容，保存后前台立即生效。</p>
      <div className="mt-8 rounded-3xl bg-brand-card p-6 shadow-elegant md:p-8">
        <AdminBookForm book={book} mode="edit" />
      </div>
    </div>
  );
}
