import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'श्री सिद्धिविनायक गणपती स्टॉल',
  description: 'सुंदर गणपती मूर्तींचा संग्रह | Beautiful Ganapati Murtis',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="mr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
