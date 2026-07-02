"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoLink } from "@/components/Logo";
import { useAuth } from "@/components/AuthProvider";

type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

function getNavLinks(pathname: string): NavLink[] {
  if (pathname.startsWith("/theory-desk")) {
    return [
      { label: "品牌理念", href: "/theory-desk#philosophy" },
      { label: "阅读宇宙", href: "/" },
      { label: "AI 荐书", href: "/ai" },
      { label: "登录 / 注册", href: "/login" },
    ];
  }

  return [
    { label: "品牌主页", href: "/theory-desk" },
    { label: "我的书房", href: "/#library" },
    { label: "AI 荐书", href: "/ai" },
    { label: "登录 / 注册", href: "/login" },
  ];
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <line x1="4" x2="20" y1="7" y2="7" />
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="17" y2="17" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function NavItem({
  link,
  className,
  onClick,
}: {
  link: NavLink;
  className: string;
  onClick?: () => void;
}) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} onClick={onClick} className={className}>
      {link.label}
    </Link>
  );
}

function UserNav() {
  const { user, logout, isLoading } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className="relative hidden md:block">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="text-sm tracking-wide text-brand-text/70 transition-colors hover:text-brand-accent"
      >
        {user.name}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-3 min-w-32 rounded-2xl bg-brand-card py-2 shadow-elegant">
          <button
            type="button"
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm text-brand-text/70 transition-colors hover:text-brand-accent"
          >
            退出登录
          </button>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navLinks = getNavLinks(pathname);

  const handleNavClick = () => setIsMenuOpen(false);
  const linkClass = "text-sm tracking-wide text-brand-text/70 transition-colors hover:text-brand-accent";
  const mobileLinkClass = "block py-1 text-base text-brand-text/80 transition-colors hover:text-brand-accent";

  return (
    <header className="sticky top-0 z-50 bg-brand-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-8 lg:px-12">
        <LogoLink />

        <nav className="hidden items-center gap-6 md:flex md:gap-8">
          {navLinks
            .filter((link) => link.label !== "登录 / 注册" || !user)
            .map((link) => (
              <NavItem key={link.label} link={link} className={linkClass} />
            ))}
          <UserNav />
        </nav>

        <button
          type="button"
          className="flex items-center justify-center p-2 text-brand-text transition-opacity hover:opacity-70 md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 rounded-2xl bg-brand-card p-6 shadow-elegant">
            {navLinks
              .filter((link) => link.label !== "登录 / 注册" || !user)
              .map((link) => (
              <li key={link.label}>
                <NavItem link={link} className={mobileLinkClass} onClick={handleNavClick} />
              </li>
            ))}
            <li>
              {user && (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    handleNavClick();
                  }}
                  className={mobileLinkClass}
                >
                  退出登录（{user.name}）
                </button>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
