import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-inter' })
const geistMono = Geist_Mono({ subsets: ['latin', 'latin-ext'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'TVQ Work OS — Work Copilot',
  description:
    'Trợ lý điều hành tích hợp vào TVQ Work OS: Command Mode, Executive Copilot, xem trước thay đổi và phân quyền L1–L3.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#101319' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`dark bg-background ${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </html>
  )
}
