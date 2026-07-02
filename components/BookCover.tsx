interface BookCoverProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

export default function BookCover({
  src,
  alt,
  fill = false,
  className = "",
  priority = false,
}: BookCoverProps) {
  const classes = fill
    ? `absolute inset-0 h-full w-full object-cover ${className}`.trim()
    : `object-cover ${className}`.trim();

  return (
    // Book covers come from admin-entered URLs on many domains.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={classes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
