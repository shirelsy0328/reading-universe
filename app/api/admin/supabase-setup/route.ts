import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { resolve } from "path";
import postgres from "postgres";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

function loadSeedBooks() {
  const booksPath = resolve(process.cwd(), "data", "books.json");
  const books = JSON.parse(readFileSync(booksPath, "utf-8")) as Array<{
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    rating: number;
    status: string;
    progress?: string;
    quote?: string;
    thoughts?: string;
  }>;

  return books.map((book, index) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    cover_url: book.coverUrl,
    rating: book.rating,
    status: book.status,
    progress: book.progress ?? null,
    quote: book.quote ?? null,
    thoughts: book.thoughts ?? null,
    sort_order: index,
  }));
}

function buildDatabaseUrl(): string | null {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const dbPassword = process.env.SUPABASE_DB_PASSWORD;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!dbPassword || !supabaseUrl) {
    return null;
  }

  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  if (!projectRef) {
    return null;
  }

  return `postgresql://postgres:${encodeURIComponent(dbPassword)}@db.${projectRef}.supabase.co:5432/postgres`;
}

async function runSchemaSql(connectionString: string) {
  const schemaPath = resolve(process.cwd(), "supabase", "full-setup.sql");
  const schemaSql = readFileSync(schemaPath, "utf-8");
  const sql = postgres(connectionString, { ssl: "require", max: 1 });

  try {
    await sql.unsafe(schemaSql);
  } finally {
    await sql.end({ timeout: 5 });
  }
}

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  try {
    const connectionString = buildDatabaseUrl();
    if (connectionString) {
      await runSchemaSql(connectionString);
    }

    const supabase = getSupabaseServerClient();
    const rows = loadSeedBooks();
    const { error } = await supabase.from("books").upsert(rows, { onConflict: "id" });

    if (error) {
      if (error.code === "PGRST205") {
        return NextResponse.json(
          {
            error:
              "books 表尚未创建。请在 Supabase SQL Editor 运行 supabase/full-setup.sql，或在 .env.local 添加 SUPABASE_DB_PASSWORD 后重试。",
          },
          { status: 400 }
        );
      }
      throw error;
    }

    const { count } = await supabase.from("books").select("*", { count: "exact", head: true });

    return NextResponse.json({
      success: true,
      schemaApplied: Boolean(connectionString),
      bookCount: count ?? rows.length,
    });
  } catch (error) {
    console.error("Supabase setup error:", error);
    return NextResponse.json({ error: "Supabase 初始化失败，请查看服务器日志。" }, { status: 500 });
  }
}
