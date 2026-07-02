"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { THEORY_DESK_URL, isExternalUrl } from "@/lib/siteConfig";

interface LogoProps {
  className?: string;
}

function TheoryDeskLogo({ className = "" }: { className?: string }) {
  const href = isExternalUrl(THEORY_DESK_URL) ? THEORY_DESK_URL : "/theory-desk";

  const content = (
    <span className={`tracking-[0.18em] ${className}`}>
      THEORY<span className="text-brand-accent"> </span>DESK
    </span>
  );

  if (isExternalUrl(THEORY_DESK_URL)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-70"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="transition-opacity hover:opacity-70">
      {content}
    </Link>
  );
}

export default function Logo({ className = "" }: LogoProps) {
  const pathname = usePathname();
  const isBrandHome = pathname.startsWith("/theory-desk");

  return (
    <span className={className}>
      <TheoryDeskLogo />
      {!isBrandHome && (
        <Link
          href="/"
          className="mt-0.5 block text-[10px] font-normal tracking-[0.2em] text-brand-text/45 transition-colors hover:text-brand-accent sm:mt-0 sm:ml-2 sm:inline sm:text-xs md:text-sm"
        >
          READING<span className="text-brand-accent">.</span>UNIVERSE
        </Link>
      )}
    </span>
  );
}

export function LogoLink({ className = "" }: LogoProps) {
  return (
    <span
      className={`inline-block font-sans text-sm font-medium text-brand-text md:text-base ${className}`}
    >
      <Logo />
    </span>
  );
}
