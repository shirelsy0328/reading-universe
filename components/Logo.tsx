import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={className}>
      <span className="tracking-[0.2em]">
        READING<span className="text-brand-accent">.</span>UNIVERSE
      </span>
      <span className="mt-0.5 block text-[10px] font-normal tracking-[0.15em] text-brand-text/45 sm:mt-0 sm:ml-2 sm:inline sm:text-xs md:text-sm">
        by Theory Desk
      </span>
    </span>
  );
}

export function LogoLink({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-block font-sans text-sm font-medium text-brand-text transition-opacity hover:opacity-70 md:text-base ${className}`}
    >
      <Logo />
    </Link>
  );
}
