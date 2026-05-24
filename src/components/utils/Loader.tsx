export default function Loader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex items-center gap-3 text-text-secondary">
        <div className="w-2 h-2 rounded-full bg-accent-violet animate-pulse" />
        <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse [animation-delay:150ms]" />
        <div className="w-2 h-2 rounded-full bg-accent-pink animate-pulse [animation-delay:300ms]" />
      </div>
    </div>
  )
}
