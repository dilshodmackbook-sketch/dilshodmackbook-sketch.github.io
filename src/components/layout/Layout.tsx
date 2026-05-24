import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import BackgroundFX from './BackgroundFX'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <BackgroundFX />
      <Navbar />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  )
}
