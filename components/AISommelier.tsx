"use client";

import { useState } from "react";
import type { BookRecommendation } from "@/lib/types";

function SpinnerIcon() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export default function AISommelier() {
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<BookRecommendation | null>(null);

  const handleAiRecommendation = async () => {
    const trimmedMood = mood.trim();
    if (!trimmedMood || loading) return;

    setLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: trimmedMood }),
      });

      const data = (await response.json()) as BookRecommendation & { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "荐书请求失败，请稍后再试。");
      }

      if (
        typeof data.title !== "string" ||
        typeof data.author !== "string" ||
        typeof data.reason !== "string"
      ) {
        throw new Error("AI 返回的数据格式无效。");
      }

      setRecommendation({
        title: data.title,
        author: data.author,
        reason: data.reason,
        demo: data.demo === true,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "发生未知错误，请重试。");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      void handleAiRecommendation();
    }
  };

  return (
    <section
      id="ai-sommelier"
      className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12"
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#2C2C2C] px-8 py-14 shadow-elegant md:px-14 md:py-20 lg:px-20 lg:py-24">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-brand-accent">
            AI Sommelier
          </p>
          <h2 className="font-serif text-3xl font-medium text-white md:text-4xl">
            AI 专属图书侍酒师
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
            告诉我你现在的心情——孤独、焦虑、想要被治愈，或只是想逃离现实。
            我会为你挑选一本最合时宜的书。
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              value={mood}
              onChange={(event) => setMood(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="例如：最近感到有些孤独，想要一本温暖的书…"
              disabled={loading}
              className="flex-1 rounded-full bg-white/10 px-6 py-4 text-sm text-white placeholder:text-white/40 outline-none ring-0 transition-colors focus:bg-white/15 disabled:opacity-50 md:text-base"
            />
            <button
              type="button"
              onClick={() => void handleAiRecommendation()}
              disabled={loading || !mood.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-8 py-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
            >
              {loading ? (
                <>
                  <SpinnerIcon />
                  <span>荐书中…</span>
                </>
              ) : (
                <>
                  <SendIcon />
                  <span>获取推荐</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <p className="mt-6 text-sm text-red-300/90" role="alert">
              {error}
            </p>
          )}

          {recommendation && (
            <div className="animate-fade-in mt-10 rounded-2xl bg-white/5 px-8 py-8 text-left md:px-10 md:py-10">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-accent">
                  为你推荐
                </p>
                {recommendation.demo && (
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-white/50">
                    演示模式 · 配置 API Key 后可启用真实 AI
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-serif text-2xl font-medium text-white md:text-3xl">
                {recommendation.title}
              </h3>
              <p className="mt-2 text-sm text-white/50">{recommendation.author}</p>
              <p className="mt-6 text-sm leading-relaxed text-white/75 md:text-base md:leading-loose">
                {recommendation.reason}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
