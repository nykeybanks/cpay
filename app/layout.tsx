import type { Metadata, Viewport } from 'next'
import { qyxFontVariables } from '@/lib/qyx-fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'QYXpay | Payment Console',
  description: 'QYXpay, by QuantumYield. A precision-engineered interface prototype for the CPay PHP SDK.',
  robots: { index: false, follow: false },
}
export const viewport: Viewport = { themeColor: '#0A0A0A', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`qyx-root ${qyxFontVariables}`}><body className="qyx-root">{children}</body></html>
}
