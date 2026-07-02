import { promises as fs } from "fs";
import path from "path";
import { mockBooks, type Book, type BookStatus } from "@/lib/mockData";
import type { BookInput } from "@/lib/books/types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "books.json");

async function ensureBooksFile(): Promise<Book[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Book[];
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(mockBooks, null, 2), "utf-8");
    return mockBooks;
  }
}

async function writeBooks(books: Book[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(books, null, 2), "utf-8");
}

export async function getBooksFromJson(): Promise<Book[]> {
  return ensureBooksFile();
}

export async function getBookByIdFromJson(id: string): Promise<Book | undefined> {
  const books = await ensureBooksFile();
  return books.find((book) => book.id === id);
}

export async function getReadingBooksFromJson(limit?: number): Promise<Book[]> {
  const books = (await ensureBooksFile()).filter((book) => book.status === "reading");
  return limit ? books.slice(0, limit) : books;
}

export async function getArchivedBooksFromJson(limit?: number): Promise<Book[]> {
  const books = (await ensureBooksFile()).filter((book) => book.status === "archived");
  return limit ? books.slice(0, limit) : books;
}

export async function getWantToReadBooksFromJson(limit?: number): Promise<Book[]> {
  const books = (await ensureBooksFile()).filter((book) => book.status === "want-to-read");
  return limit ? books.slice(0, limit) : books;
}

export async function createBookInJson(input: BookInput): Promise<Book> {
  const books = await ensureBooksFile();
  const book: Book = {
    id: `book-${Date.now()}`,
    ...input,
  };
  books.unshift(book);
  await writeBooks(books);
  return book;
}

export async function updateBookInJson(id: string, input: Partial<BookInput>): Promise<Book> {
  const books = await ensureBooksFile();
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    throw new Error("BOOK_NOT_FOUND");
  }

  books[index] = { ...books[index], ...input };
  await writeBooks(books);
  return books[index];
}

export async function deleteBookFromJson(id: string): Promise<void> {
  const books = await ensureBooksFile();
  const next = books.filter((book) => book.id !== id);
  if (next.length === books.length) {
    throw new Error("BOOK_NOT_FOUND");
  }
  await writeBooks(next);
}

export function isMissingBooksTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205";
}
