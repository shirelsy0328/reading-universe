"use client";

import { useEffect, useState } from "react";
import type { VisitorComment } from "@/lib/mockComments";
import {
  getUserComment,
  writeUserComment,
  type StoredComment,
} from "@/lib/bookStorage";

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
  const [draft, setDraft] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const refreshComments = () => {
    const userComment = getUserComment(bookId);
    setComments(buildDisplayComments(bookId, visitorComments, userComment));
    setDraft(userComment?.content ?? "");
  };

  useEffect(() => {
    refreshComments();
  }, [bookId, visitorComments]);

  const handleSave = () => {
    writeUserComment(bookId, draft);
    refreshComments();
    setIsEditing(false);
  };

  const handleDelete = () => {
    writeUserComment(bookId, "");
    refreshComments();
    setDraft("");
    setIsEditing(false);
  };

  const hasMyComment = comments.some((comment) => comment.isMine);

  return (
    <section className="mt-12 md:mt-16">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-brand-accent">
        Comments
      </p>
      <h2 className="font-serif text-2xl font-medium text-brand-text md:text-3xl">
        读者评论
        <span className="ml-2 text-base font-normal text-brand-text/40">
          ({comments.length})
        </span>
      </h2>

      <div className="mt-8 space-y-4">
        {comments.length === 0 && !isEditing && (
          <p className="rounded-2xl bg-brand-card px-6 py-8 text-center text-sm text-brand-text/45 shadow-elegant">
            还没有评论，来做第一个留言的人吧。
          </p>
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
                    我的评论
                  </span>
                )}
              </p>
              <time className="text-xs text-brand-text/40">{formatDate(comment.createdAt)}</time>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-brand-text/70 md:text-base md:leading-loose">
              {comment.content}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-brand-card px-6 py-6 shadow-elegant md:px-8 md:py-8">
        <h3 className="text-sm font-medium text-brand-text md:text-base">
          {hasMyComment ? "编辑我的评论" : "写下你的评论"}
        </h3>
        {(isEditing || !hasMyComment) && (
          <>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="分享你的读后感、疑问或共鸣…"
              rows={4}
              className="mt-4 w-full resize-none rounded-xl bg-brand-bg px-4 py-3 text-sm leading-relaxed text-brand-text outline-none placeholder:text-brand-text/35 md:text-base"
            />
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              {hasMyComment && (
                <>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="rounded-full px-4 py-2 text-xs text-brand-text/50 transition-colors hover:text-red-500 md:text-sm"
                  >
                    删除
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setDraft(getUserComment(bookId)?.content ?? "");
                    }}
                    className="rounded-full px-4 py-2 text-xs text-brand-text/50 transition-colors hover:text-brand-text md:text-sm"
                  >
                    取消
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={handleSave}
                disabled={!draft.trim()}
                className="rounded-full bg-brand-accent px-5 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 md:text-sm"
              >
                {hasMyComment ? "更新评论" : "发布评论"}
              </button>
            </div>
          </>
        )}
        {hasMyComment && !isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="mt-4 rounded-full bg-brand-bg px-5 py-2 text-xs text-brand-text/60 transition-colors hover:text-brand-accent md:text-sm"
          >
            编辑我的评论
          </button>
        )}
      </div>
    </section>
  );
}
