import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import SmoothScroll from '../utils/SmoothScroll'
import ScrollProgress from '../utils/ScrollProgress'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SmoothScroll />
      <ScrollProgress />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-noise opacity-[0.035] mix-blend-overlay" />
      <Navbar />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
    </div>
  )
}
