"use client";

import { useEffect, useState } from "react";
import type { Book } from "@/lib/mockData";
import { readFavorites, writeFavorites, getUserComment } from "@/lib/bookStorage";
import {
  OPEN_REVIEW_DIALOG_EVENT,
  REVIEW_SAVED_EVENT,
  type OpenReviewDialogDetail,
  type ReviewSavedDetail,
} from "@/lib/reviewDialog";
import ReviewDialog from "@/components/ReviewDialog";

interface BookActionsProps {
  book: Book;
  compact?: boolean;
}

function HeartOutlineIcon({ className, filled }: { className?: string; filled?: boolean }) {
  if (filled) {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          className="fill-current"
        />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 6l-4-4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2v14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReviewIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 7h8M8 11h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BookActions({ book, compact = false }: BookActionsProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareTip, setShareTip] = useState<string | null>(null);
  const [hasComment, setHasComment] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const refreshCommentState = () => {
    setHasComment(!!getUserComment(book.id));
  };

  useEffect(() => {
    setIsFavorite(readFavorites().includes(book.id));
    refreshCommentState();
  }, [book.id]);

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const detail = (event as CustomEvent<OpenReviewDialogDetail>).detail;
      if (detail.bookId === book.id) {
        setIsReviewOpen(true);
      }
    };

    const handleSaved = (event: Event) => {
      const detail = (event as CustomEvent<ReviewSavedDetail>).detail;
      if (detail.bookId === book.id) {
        refreshCommentState();
      }
    };

    window.addEventListener(OPEN_REVIEW_DIALOG_EVENT, handleOpen);
    window.addEventListener(REVIEW_SAVED_EVENT, handleSaved);
    return () => {
      window.removeEventListener(OPEN_REVIEW_DIALOG_EVENT, handleOpen);
      window.removeEventListener(REVIEW_SAVED_EVENT, handleSaved);
    };
  }, [book.id]);

  const toggleFavorite = () => {
    const favorites = readFavorites();
    const next = favorites.includes(book.id)
      ? favorites.filter((id) => id !== book.id)
      : [...favorites, book.id];
    writeFavorites(next);
    setIsFavorite(!isFavorite);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/books/${book.id}`;
    const shareText = `《${book.title}》— ${book.author}\n${book.quote ? `「${book.quote}」\n` : ""}来自 READING.UNIVERSE by Theory Desk`;

    if (navigator.share) {
      try {
        await navigator.share({ title: book.title, text: shareText, url: shareUrl });
        return;
      } catch {
        // fall through
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setShareTip("已复制");
    } catch {
      setShareTip("失败");
    }
    setTimeout(() => setShareTip(null), 2000);
  };

  const buttonClass = compact
    ? "flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-brand-text/45 transition-colors hover:bg-brand-bg hover:text-brand-accent"
    : "flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-brand-text/45 transition-colors hover:bg-brand-bg hover:text-brand-accent";

  const iconClass = compact ? "h-3.5 w-3.5" : "h-4 w-4";
  const labelClass = compact ? "text-[9px] md:text-[10px]" : "text-[10px] md:text-xs";

  return (
    <>
      <div className="mt-3 md:mt-4">
        <div className="flex items-center justify-around">
          <button
            type="button"
            onClick={() => setIsReviewOpen(true)}
            className={buttonClass}
            aria-label="写书评"
          >
            <ReviewIcon className={iconClass} />
            <span className={labelClass}>书评</span>
          </button>

          <button
            type="button"
            onClick={toggleFavorite}
            className={`${buttonClass} ${isFavorite ? "text-brand-accent" : ""}`}
            aria-label={isFavorite ? "取消收藏" : "收藏"}
            aria-pressed={isFavorite}
          >
            <HeartOutlineIcon className={iconClass} filled={isFavorite} />
            <span className={labelClass}>{isFavorite ? "已收藏" : "收藏"}</span>
          </button>

          <button type="button" onClick={() => void handleShare()} className={buttonClass} aria-label="分享">
            <ShareIcon className={iconClass} />
            <span className={labelClass}>{shareTip ?? "分享"}</span>
          </button>
        </div>

        {compact && hasComment && (
          <p className="mt-2 text-center text-[10px] text-brand-accent/70 md:text-xs">
            已写书评
          </p>
        )}
      </div>

      <ReviewDialog book={book} isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} />
    </>
  );
}
