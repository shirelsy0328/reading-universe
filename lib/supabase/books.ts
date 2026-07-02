import type { Book, BookStatus } from "@/lib/mockData";

export type BookRow = {
  id: string;
  title: string;
  author: string;
  cover_url: string;
  rating: number;
  status: BookStatus;
  progress: string | null;
  quote: string | null;
  thoughts: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export function rowToBook(row: BookRow): Book {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    coverUrl: row.cover_url,
    rating: Number(row.rating),
    status: row.status,
    progress: row.progress ?? undefined,
    quote: row.quote ?? undefined,
    thoughts: row.thoughts ?? undefined,
  };
}

export type BookInsert = {
  id: string;
  title: string;
  author: string;
  cover_url: string;
  rating: number;
  status: BookStatus;
  progress?: string | null;
  quote?: string | null;
  thoughts?: string | null;
  sort_order: number;
};

export function inputToRow(
  input: {
    title: string;
    author: string;
    coverUrl: string;
    rating: number;
    status: BookStatus;
    progress?: string;
    quote?: string;
    thoughts?: string;
  },
  id: string,
  sortOrder: number
): BookInsert {
  return {
    id,
    title: input.title,
    author: input.author,
    cover_url: input.coverUrl,
    rating: input.rating,
    status: input.status,
    progress: input.progress ?? null,
    quote: input.quote ?? null,
    thoughts: input.thoughts ?? null,
    sort_order: sortOrder,
  };
}

export function partialInputToRow(
  input: Partial<{
    title: string;
    author: string;
    coverUrl: string;
    rating: number;
    status: BookStatus;
    progress?: string;
    quote?: string;
    thoughts?: string;
  }>
): Partial<BookInsert> {
  const row: Partial<BookInsert> = {};

  if (input.title !== undefined) row.title = input.title;
  if (input.author !== undefined) row.author = input.author;
  if (input.coverUrl !== undefined) row.cover_url = input.coverUrl;
  if (input.rating !== undefined) row.rating = input.rating;
  if (input.status !== undefined) row.status = input.status;
  if (input.progress !== undefined) row.progress = input.progress ?? null;
  if (input.quote !== undefined) row.quote = input.quote ?? null;
  if (input.thoughts !== undefined) row.thoughts = input.thoughts ?? null;

  return row;
}
