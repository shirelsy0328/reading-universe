import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      <header className="border-b border-brand-text/5 bg-brand-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-accent">Admin</p>
            <h1 className="font-serif text-xl text-brand-text">Theory Desk 管理后台</h1>
          </div>
          <p className="hidden text-xs text-brand-text/40 md:block">
            此页面不对外展示 · 仅管理员可见
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10">{children}</div>
    </div>
  );
}
