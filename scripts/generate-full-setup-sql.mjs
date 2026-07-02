import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

function esc(value) {
  return String(value ?? "").replace(/'/g, "''");
}

const books = JSON.parse(readFileSync(resolve(rootDir, "data/books.json"), "utf-8"));
const schema = readFileSync(resolve(rootDir, "supabase/schema.sql"), "utf-8");

const values = books.map((book, index) => {
  const parts = [
    `'${esc(book.id)}'`,
    `'${esc(book.title)}'`,
    `'${esc(book.author)}'`,
    `'${esc(book.coverUrl)}'`,
    book.rating,
    `'${esc(book.status)}'`,
    book.progress ? `'${esc(book.progress)}'` : "null",
    book.quote ? `'${esc(book.quote)}'` : "null",
    book.thoughts ? `'${esc(book.thoughts)}'` : "null",
    index,
  ];
  return `(${parts.join(", ")})`;
});

const sql = `${schema}

insert into public.books (id, title, author, cover_url, rating, status, progress, quote, thoughts, sort_order)
values
${values.join(",\n")}
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  cover_url = excluded.cover_url,
  rating = excluded.rating,
  status = excluded.status,
  progress = excluded.progress,
  quote = excluded.quote,
  thoughts = excluded.thoughts,
  sort_order = excluded.sort_order,
  updated_at = now();
`;

writeFileSync(resolve(rootDir, "supabase/full-setup.sql"), sql);
console.log(`Generated supabase/full-setup.sql with ${books.length} books.`);
