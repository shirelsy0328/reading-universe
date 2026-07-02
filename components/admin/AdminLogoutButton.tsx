"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={() => void handleLogout()}
      className="rounded-full bg-brand-bg px-5 py-2.5 text-sm text-brand-text/60 transition-colors hover:text-brand-accent"
    >
      退出管理
    </button>
  );
}
