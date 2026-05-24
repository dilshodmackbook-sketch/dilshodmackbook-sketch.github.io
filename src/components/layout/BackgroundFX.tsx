export default function BackgroundFX() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
      <div className="absolute inset-0 bg-grid opacity-[0.18]" />
      <div className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full bg-accent-violet/15 blur-3xl" />
      <div className="absolute -bottom-40 -right-32 w-[40rem] h-[40rem] rounded-full bg-accent-cyan/12 blur-3xl" />
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay" />
    </div>
  )
}
