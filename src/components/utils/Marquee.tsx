interface MarqueeProps {
  items: string[]
  className?: string
}

export default function Marquee({ items, className = '' }: MarqueeProps) {
  const row = [...items, ...items]
  return (
    <div className={`mask-fade-x group relative w-full overflow-hidden ${className}`} aria-hidden>
      <div className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-6 pr-6 font-mono text-[11px] uppercase tracking-[0.25em] text-faint"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-accent/70" />
          </span>
        ))}
      </div>
    </div>
  )
}
