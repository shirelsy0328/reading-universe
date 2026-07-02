"use client";

import { useEffect, useRef, useState } from "react";
import type { Book } from "@/lib/mockData";
import { getUserComment, writeUserComment } from "@/lib/bookStorage";
import { notifyReviewSaved } from "@/lib/reviewDialog";

interface ReviewDialogProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default function ReviewDialog({ book, isOpen, onClose }: ReviewDialogProps) {
  const [draft, setDraft] = useState("");
  const [hasExisting, setHasExisting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const existing = getUserComment(book.id);
    setDraft(existing?.content ?? "");
    setHasExisting(!!existing?.content);

    const focusTimer = window.setTimeout(() => textareaRef.current?.focus(), 100);
    return () => window.clearTimeout(focusTimer);
  }, [isOpen, book.id]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    if (!draft.trim()) {
      return;
    }

    writeUserComment(book.id, draft);
    notifyReviewSaved(book.id);
    onClose();
  };

  const handleDelete = () => {
    writeUserComment(book.id, "");
    notifyReviewSaved(book.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-brand-text/20 backdrop-blur-sm" aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-dialog-title"
        className="relative w-full max-w-lg rounded-3xl bg-brand-card shadow-elegant transition-all duration-200"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-brand-text/5 px-6 py-5 md:px-8">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-accent">Write Review</p>
            <h2 id="review-dialog-title" className="mt-2 truncate font-serif text-xl text-brand-text md:text-2xl">
              {book.title}
            </h2>
            <p className="mt-1 truncate text-sm text-brand-text/50">{book.author}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full p-2 text-brand-text/45 transition-colors hover:bg-brand-bg hover:text-brand-text"
            aria-label="关闭"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="px-6 py-6 md:px-8 md:py-7">
          <label htmlFor={`review-${book.id}`} className="text-sm font-medium text-brand-text">
            {hasExisting ? "编辑你的书评" : "写下你的书评"}
          </label>
          <textarea
            id={`review-${book.id}`}
            ref={textareaRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="分享你的读后感、疑问或共鸣…"
            rows={6}
            className="mt-4 w-full resize-none rounded-2xl bg-brand-bg px-4 py-3.5 text-sm leading-relaxed text-brand-text outline-none placeholder:text-brand-text/35 md:text-base"
          />

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            {hasExisting ? (
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-full px-4 py-2 text-sm text-brand-text/50 transition-colors hover:text-red-500"
              >
                删除书评
              </button>
            ) : (
              <span />
            )}

            <div className="ml-auto flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-5 py-2.5 text-sm text-brand-text/60 transition-colors hover:text-brand-text"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!draft.trim()}
                className="rounded-full bg-brand-accent px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {hasExisting ? "更新书评" : "发布书评"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
