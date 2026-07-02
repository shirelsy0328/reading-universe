"use client";

import { useEffect, useState } from "react";
import type { VisitorComment } from "@/lib/mockComments";
import {
  getUserComment,
  type StoredComment,
} from "@/lib/bookStorage";
import {
  REVIEW_SAVED_EVENT,
  openReviewDialog,
  type ReviewSavedDetail,
} from "@/lib/reviewDialog";

interface DisplayComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  isMine?: boolean;
}

interface CommentSectionProps {
  bookId: string;
  visitorComments: VisitorComment[];
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function buildDisplayComments(
  bookId: string,
  visitorComments: VisitorComment[],
  userComment: StoredComment | null
): DisplayComment[] {
  const list: DisplayComment[] = visitorComments.map((comment) => ({
    id: comment.id,
    author: comment.author,
    content: comment.content,
    createdAt: comment.createdAt,
  }));

  if (userComment) {
    list.unshift({
      id: "mine",
      author: "我",
      content: userComment.content,
      createdAt: userComment.createdAt,
      isMine: true,
    });
  }

  return list;
}

export default function CommentSection({ bookId, visitorComments }: CommentSectionProps) {
  const [comments, setComments] = useState<DisplayComment[]>([]);

  const refreshComments = () => {
    const userComment = getUserComment(bookId);
    setComments(buildDisplayComments(bookId, visitorComments, userComment));
  };

  useEffect(() => {
    refreshComments();
  }, [bookId, visitorComments]);

  useEffect(() => {
    const handleSaved = (event: Event) => {
      const detail = (event as CustomEvent<ReviewSavedDetail>).detail;
      if (detail.bookId === bookId) {
        refreshComments();
      }
    };

    window.addEventListener(REVIEW_SAVED_EVENT, handleSaved);
    return () => window.removeEventListener(REVIEW_SAVED_EVENT, handleSaved);
  }, [bookId, visitorComments]);

  const hasMyComment = comments.some((comment) => comment.isMine);

  return (
    <section id="comments" className="mt-12 md:mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-brand-accent">
            Comments
          </p>
          <h2 className="font-serif text-2xl font-medium text-brand-text md:text-3xl">
            读者评论
            <span className="ml-2 text-base font-normal text-brand-text/40">
              ({comments.length})
            </span>
          </h2>
        </div>

        <button
          type="button"
          onClick={() => openReviewDialog(bookId)}
          className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {hasMyComment ? "编辑我的书评" : "写书评"}
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {comments.length === 0 && (
          <div className="rounded-2xl bg-brand-card px-6 py-10 text-center shadow-elegant">
            <p className="text-sm text-brand-text/45">还没有评论，来做第一个留言的人吧。</p>
            <button
              type="button"
              onClick={() => openReviewDialog(bookId)}
              className="mt-5 rounded-full bg-brand-bg px-5 py-2.5 text-sm text-brand-accent transition-colors hover:bg-brand-accent/10"
            >
              写书评
            </button>
          </div>
        )}

        {comments.map((comment) => (
          <article
            key={comment.id}
            className={`rounded-2xl px-6 py-5 shadow-elegant md:px-8 md:py-6 ${
              comment.isMine ? "bg-brand-accent/5" : "bg-brand-card"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-brand-text">
                {comment.author}
                {comment.isMine && (
                  <span className="ml-2 rounded-full bg-brand-accent/15 px-2 py-0.5 text-[10px] text-brand-accent">
                    我的书评
                  </span>
                )}
              </p>
              <div className="flex items-center gap-3">
                <time className="text-xs text-brand-text/40">{formatDate(comment.createdAt)}</time>
                {comment.isMine && (
                  <button
                    type="button"
                    onClick={() => openReviewDialog(bookId)}
                    className="text-xs text-brand-accent transition-opacity hover:opacity-80"
                  >
                    编辑
                  </button>
                )}
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-brand-text/70 md:text-base md:leading-loose">
              {comment.content}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
