export default function Loader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-faint">
        <span className="h-1.5 w-1.5 animate-pulse2 rounded-full bg-accent" />
        Loading
      </div>
    </div>
  )
}
