import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  getAdminCookieOptions,
  getAdminSessionToken,
  verifyAdminCredentials,
} from "@/lib/admin/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim() ?? "";
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json({ error: "请输入管理员邮箱和密码。" }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const isAdminEmail = Boolean(adminEmail && email.trim().toLowerCase() === adminEmail);

    if (!verifyAdminCredentials(email, password)) {
      return NextResponse.json(
        {
          error: isAdminEmail ? "管理员账号或密码不正确。" : "邮箱或密码不正确。",
          isAdmin: isAdminEmail,
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE_NAME, getAdminSessionToken(), getAdminCookieOptions());
    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "登录失败，请稍后再试。" }, { status: 500 });
  }
}
