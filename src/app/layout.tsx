"use client"

import './globals.css'
import { QueryProvider } from '../shared/components/queryProvider'
import { notoSansFont, theme } from '@/shared/theme/theme'
import styled from '@emotion/styled'
import Footer from '@/shared/components/Footer'

const LayoutWrapper = styled.div`
  min-height: calc(100dvh - ${theme.spacing.xxxlarge});
  background-color: ${theme.colors.background.page};
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={notoSansFont.variable}>
      <body className="bg-gray-900 text-white antialiased">
        <QueryProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}
