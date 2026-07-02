import { getSupabaseServerClient } from "@/lib/supabase/server";
import {
  inputToRow,
  partialInputToRow,
  rowToBook,
  type BookRow,
} from "@/lib/supabase/books";
import type { Book } from "@/lib/mockData";
import type { BookInput } from "@/lib/books/types";
import {
  createBookInJson,
  deleteBookFromJson,
  getArchivedBooksFromJson,
  getBookByIdFromJson,
  getBooksFromJson,
  getReadingBooksFromJson,
  getWantToReadBooksFromJson,
  isMissingBooksTableError,
  updateBookInJson,
} from "@/lib/books/jsonFallback";

export type { BookInput } from "@/lib/books/types";

function mapRows(data: BookRow[] | null): Book[] {
  return (data ?? []).map(rowToBook);
}

async function getNextSortOrder(): Promise<number> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("books")
    .select("sort_order")
    .order("sort_order", { ascending: true })
    .limit(1);

  if (error) {
    if (isMissingBooksTableError(error)) {
      return 0;
    }
    throw error;
  }

  const minOrder = data?.[0]?.sort_order ?? 0;
  return minOrder - 1;
}

export async function getBooks(): Promise<Book[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    if (isMissingBooksTableError(error)) {
      return getBooksFromJson();
    }
    throw error;
  }

  return mapRows(data as BookRow[] | null);
}

export async function getBookById(id: string): Promise<Book | undefined> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("books").select("*").eq("id", id).maybeSingle();

  if (error) {
    if (isMissingBooksTableError(error)) {
      return getBookByIdFromJson(id);
    }
    throw error;
  }

  return data ? rowToBook(data as BookRow) : undefined;
}

export async function getReadingBooks(limit?: number): Promise<Book[]> {
  const supabase = getSupabaseServerClient();
  let query = supabase
    .from("books")
    .select("*")
    .eq("status", "reading")
    .order("sort_order", { ascending: true });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) {
    if (isMissingBooksTableError(error)) {
      return getReadingBooksFromJson(limit);
    }
    throw error;
  }

  return mapRows(data as BookRow[] | null);
}

export async function getArchivedBooks(limit?: number): Promise<Book[]> {
  const supabase = getSupabaseServerClient();
  let query = supabase
    .from("books")
    .select("*")
    .eq("status", "archived")
    .order("sort_order", { ascending: true });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) {
    if (isMissingBooksTableError(error)) {
      return getArchivedBooksFromJson(limit);
    }
    throw error;
  }

  return mapRows(data as BookRow[] | null);
}

export async function getWantToReadBooks(limit?: number): Promise<Book[]> {
  const supabase = getSupabaseServerClient();
  let query = supabase
    .from("books")
    .select("*")
    .eq("status", "want-to-read")
    .order("sort_order", { ascending: true });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) {
    if (isMissingBooksTableError(error)) {
      return getWantToReadBooksFromJson(limit);
    }
    throw error;
  }

  return mapRows(data as BookRow[] | null);
}

export async function createBook(input: BookInput): Promise<Book> {
  const supabase = getSupabaseServerClient();
  const id = `book-${Date.now()}`;
  const sortOrder = await getNextSortOrder();
  const row = inputToRow(input, id, sortOrder);

  const { data, error } = await supabase.from("books").insert(row).select("*").single();

  if (error) {
    if (isMissingBooksTableError(error)) {
      return createBookInJson(input);
    }
    throw error;
  }

  return rowToBook(data as BookRow);
}

export async function updateBook(id: string, input: Partial<BookInput>): Promise<Book> {
  const supabase = getSupabaseServerClient();
  const row = partialInputToRow(input);

  const { data, error } = await supabase
    .from("books")
    .update(row)
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    if (isMissingBooksTableError(error)) {
      return updateBookInJson(id, input);
    }
    throw error;
  }

  if (!data) {
    throw new Error("BOOK_NOT_FOUND");
  }

  return rowToBook(data as BookRow);
}

export async function deleteBook(id: string): Promise<void> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("books").delete().eq("id", id).select("id");

  if (error) {
    if (isMissingBooksTableError(error)) {
      return deleteBookFromJson(id);
    }
    throw error;
  }

  if (!data?.length) {
    throw new Error("BOOK_NOT_FOUND");
  }
}
