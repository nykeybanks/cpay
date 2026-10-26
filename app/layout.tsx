import type { Metadata, Viewport } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata: Metadata = {
  title: 'QYXpay | Payment Console',
  description: 'The QYXpay payment console prototype. Explore payment operations, invoice previews, wallet setup, and the CPay SDK.',
  robots: { index: false, follow: false },
}
export const viewport: Viewport = { themeColor: '#0A0A0A', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`bg-background ${inter.variable} ${orbitron.variable}`}><body className="font-sans text-foreground">{children}</body></html>
}
