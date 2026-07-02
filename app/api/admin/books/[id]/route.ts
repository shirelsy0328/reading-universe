import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { deleteBook, updateBook, type BookInput } from "@/lib/books/store";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const body = (await request.json()) as Partial<BookInput>;
    const book = await updateBook(id, body);
    return NextResponse.json(book);
  } catch (error) {
    if (error instanceof Error && error.message === "BOOK_NOT_FOUND") {
      return NextResponse.json({ error: "书籍不存在" }, { status: 404 });
    }
    return NextResponse.json({ error: "更新失败" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    await deleteBook(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "BOOK_NOT_FOUND") {
      return NextResponse.json({ error: "书籍不存在" }, { status: 404 });
    }
    return NextResponse.json({ error: "删除失败" }, { status: 500 });
  }
}
