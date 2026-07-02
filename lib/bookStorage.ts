export interface StoredComment {
  content: string;
  createdAt: string;
}

export const FAVORITES_KEY = "reading-universe-favorites";
export const COMMENTS_KEY = "reading-universe-comments";

export function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function writeFavorites(favorites: string[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function readUserComments(): Record<string, StoredComment> {
  if (typeof window === "undefined") return {};
  try {
    const raw = JSON.parse(localStorage.getItem(COMMENTS_KEY) ?? "{}") as Record<
      string,
      StoredComment | string
    >;
    const normalized: Record<string, StoredComment> = {};
    for (const [bookId, value] of Object.entries(raw)) {
      if (typeof value === "string") {
        normalized[bookId] = { content: value, createdAt: new Date().toISOString() };
      } else {
        normalized[bookId] = value;
      }
    }
    return normalized;
  } catch {
    return {};
  }
}

export function writeUserComment(bookId: string, content: string) {
  const comments = readUserComments();
  if (content.trim()) {
    comments[bookId] = { content: content.trim(), createdAt: new Date().toISOString() };
  } else {
    delete comments[bookId];
  }
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
}

export function getUserComment(bookId: string): StoredComment | null {
  return readUserComments()[bookId] ?? null;
}
