import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import postgres from "postgres";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

function loadEnvFile(filename) {
  const filePath = resolve(rootDir, filename);
  if (!existsSync(filePath)) {
    return;
  }

  const content = readFileSync(filePath, "utf-8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const databaseUrl = process.env.DATABASE_URL;
const dbPassword = process.env.SUPABASE_DB_PASSWORD;

function getProjectRef(url) {
  const match = url.match(/https:\/\/([^.]+)\.supabase\.co/);
  return match?.[1] ?? null;
}

function buildDatabaseUrl() {
  if (databaseUrl) {
    return databaseUrl;
  }

  if (!dbPassword || !supabaseUrl) {
    return null;
  }

  const projectRef = getProjectRef(supabaseUrl);
  if (!projectRef) {
    return null;
  }

  const encodedPassword = encodeURIComponent(dbPassword);
  return `postgresql://postgres:${encodedPassword}@db.${projectRef}.supabase.co:5432/postgres`;
}

async function runSchemaSql(connectionString) {
  const schemaPath = resolve(rootDir, "supabase", "full-setup.sql");
  const schemaSql = readFileSync(schemaPath, "utf-8");
  const sql = postgres(connectionString, { ssl: "require", max: 1 });

  try {
    await sql.unsafe(schemaSql);
    console.log("✓ 数据库表结构已创建/更新");
  } finally {
    await sql.end({ timeout: 5 });
  }
}

function loadSeedBooks() {
  const booksPath = resolve(rootDir, "data", "books.json");
  const books = JSON.parse(readFileSync(booksPath, "utf-8"));

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

async function seedBooks() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("缺少 Supabase URL 或 API Key。");
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const rows = loadSeedBooks();
  const { error } = await supabase.from("books").upsert(rows, { onConflict: "id" });

  if (error) {
    throw error;
  }

  console.log(`✓ 已导入 ${rows.length} 本书到 Supabase`);
}

async function verifyBooks() {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { count, error } = await supabase.from("books").select("*", { count: "exact", head: true });
  if (error) {
    throw error;
  }

  console.log(`✓ 当前 Supabase books 表共有 ${count ?? 0} 条记录`);
}

async function main() {
  console.log("开始 Supabase 初始化...\n");

  const connectionString = buildDatabaseUrl();
  if (connectionString) {
    await runSchemaSql(connectionString);
  } else {
    console.log("ℹ 未设置 DATABASE_URL / SUPABASE_DB_PASSWORD，跳过 SQL 建表。");
    console.log("  若 books 表不存在，请在 Supabase SQL Editor 中运行 supabase/full-setup.sql\n");
  }

  await seedBooks();
  await verifyBooks();
  console.log("\n完成。");
}

main().catch((error) => {
  console.error("\n初始化失败:", error.message ?? error);
  process.exit(1);
});
