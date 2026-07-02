import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { createBook, getBooks, type BookInput } from "@/lib/books/store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const books = await getBooks();
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as BookInput;
    const book = await createBook(body);
    return NextResponse.json(book);
  } catch {
    return NextResponse.json({ error: "创建失败" }, { status: 500 });
  }
}
