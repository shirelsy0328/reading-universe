"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Book, BookStatus } from "@/lib/mockData";

interface AdminBookFormProps {
  book?: Book;
  mode: "create" | "edit";
}

const statuses: { value: BookStatus; label: string }[] = [
  { value: "reading", label: "正在阅读" },
  { value: "archived", label: "典藏" },
  { value: "want-to-read", label: "想读" },
];

export default function AdminBookForm({ book, mode }: AdminBookFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(book?.title ?? "");
  const [author, setAuthor] = useState(book?.author ?? "");
  const [coverUrl, setCoverUrl] = useState(book?.coverUrl ?? "");
  const [rating, setRating] = useState(book?.rating?.toString() ?? "9.0");
  const [status, setStatus] = useState<BookStatus>(book?.status ?? "reading");
  const [progress, setProgress] = useState(book?.progress ?? "");
  const [quote, setQuote] = useState(book?.quote ?? "");
  const [thoughts, setThoughts] = useState(book?.thoughts ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputClass =
    "w-full rounded-2xl bg-brand-bg px-4 py-3 text-sm text-brand-text outline-none placeholder:text-brand-text/35";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title: title.trim(),
      author: author.trim(),
      coverUrl: coverUrl.trim(),
      rating: Number(rating),
      status,
      progress: progress.trim() || undefined,
      quote: quote.trim() || undefined,
      thoughts: thoughts.trim() || undefined,
    };

    try {
      const response =
        mode === "create"
          ? await fetch("/api/admin/books", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
          : await fetch(`/api/admin/books/${book?.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "保存失败");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存失败");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!book || !confirm(`确定删除《${book.title}》吗？`)) return;

    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/books/${book.id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("删除失败");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "删除失败");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={(event) => void handleSubmit(event)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm text-brand-text/60">书名</span>
          <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-brand-text/60">作者</span>
          <input className={inputClass} value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </label>
        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm text-brand-text/60">封面图片 URL</span>
          <input className={inputClass} value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} required />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-brand-text/60">评分（10 分制）</span>
          <input
            className={inputClass}
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-brand-text/60">状态</span>
          <select
            className={inputClass}
            value={status}
            onChange={(e) => setStatus(e.target.value as BookStatus)}
          >
            {statuses.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-brand-text/60">阅读进度（仅「正在阅读」）</span>
          <input
            className={inputClass}
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            placeholder="例如 65%"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm text-brand-text/60">书中金句</span>
        <textarea
          className={`${inputClass} min-h-24 resize-y`}
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm text-brand-text/60">我的书评</span>
        <textarea
          className={`${inputClass} min-h-40 resize-y`}
          value={thoughts}
          onChange={(e) => setThoughts(e.target.value)}
          placeholder="写下你对这本书的个人书评…"
        />
      </label>

      {error && <p className="text-sm text-red-500/80">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-brand-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "保存中…" : mode === "create" ? "创建书籍" : "保存修改"}
        </button>
        <Link
          href="/admin"
          className="rounded-full bg-brand-bg px-6 py-3 text-sm text-brand-text/60 transition-colors hover:text-brand-text"
        >
          取消
        </Link>
        {mode === "edit" && (
          <button
            type="button"
            onClick={() => void handleDelete()}
            disabled={saving}
            className="rounded-full px-6 py-3 text-sm text-red-500/70 transition-colors hover:text-red-500 disabled:opacity-50"
          >
            删除
          </button>
        )}
      </div>
    </form>
  );
}
