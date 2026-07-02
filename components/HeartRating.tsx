import { toHeartScore } from "@/lib/rating";

interface HeartRatingProps {
  rating: number;
  size?: "sm" | "md";
  showValue?: boolean;
}

function HeartIcon({ filled, className }: { filled?: boolean; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        className={filled ? "fill-brand-accent" : "fill-brand-accent/15"}
      />
    </svg>
  );
}

function HalfHeartIcon({ className }: { className?: string }) {
  return (
    <span className={`relative inline-flex ${className}`}>
      <HeartIcon className="h-full w-full" />
      <span className="absolute inset-0 w-1/2 overflow-hidden">
        <HeartIcon filled className="h-full w-full" />
      </span>
    </span>
  );
}

export default function HeartRating({
  rating,
  size = "md",
  showValue = true,
}: HeartRatingProps) {
  const heartScore = toHeartScore(rating);
  const fullHearts = Math.floor(heartScore);
  const hasHalf = heartScore - fullHearts >= 0.5;
  const emptyHearts = 5 - fullHearts - (hasHalf ? 1 : 0);

  const iconSize = size === "sm" ? "h-3 w-3 md:h-3.5 md:w-3.5" : "h-4 w-4 md:h-5 md:w-5";

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`评分 ${heartScore.toFixed(1)} 颗心，满分 5 颗心`}
      >
        {Array.from({ length: fullHearts }).map((_, index) => (
          <HeartIcon key={`full-${index}`} filled className={iconSize} />
        ))}
        {hasHalf && <HalfHeartIcon className={iconSize} />}
        {Array.from({ length: emptyHearts }).map((_, index) => (
          <HeartIcon key={`empty-${index}`} className={iconSize} />
        ))}
      </div>
      {showValue && (
        <span className={`font-medium text-brand-accent ${size === "sm" ? "text-[10px] md:text-xs" : "text-xs md:text-sm"}`}>
          {heartScore.toFixed(1)}
        </span>
      )}
    </div>
  );
}
