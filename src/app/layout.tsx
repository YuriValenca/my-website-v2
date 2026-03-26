import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '../shared/components/queryProvider'
import { notoSansFont } from '@/shared/theme/theme'

export const metadata: Metadata = {
  title: 'Yuri Valença - Portfolio',
  description: 'Frontend Developer & Software Engineer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={notoSansFont.variable}>
      <body className="bg-gray-900 text-white antialiased">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}