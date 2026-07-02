import Link from "next/link";
import AdminBookForm from "@/components/admin/AdminBookForm";

export default function AdminNewBookPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-brand-text/50 transition-colors hover:text-brand-accent">
        ← 返回书籍列表
      </Link>
      <h2 className="mt-6 font-serif text-2xl text-brand-text">添加新书</h2>
      <p className="mt-2 text-sm text-brand-text/50">新书将出现在 READING.UNIVERSE 前台对应分区。</p>
      <div className="mt-8 rounded-3xl bg-brand-card p-6 shadow-elegant md:p-8">
        <AdminBookForm mode="create" />
      </div>
    </div>
  );
}
