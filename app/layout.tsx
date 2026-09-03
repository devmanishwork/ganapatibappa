import type { Metadata } from 'next'
import { Space_Grotesk, Noto_Serif_Devanagari } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
})

const notoDevanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'श्री सिद्धिविनायक गणपती स्टॉल',
  description: 'सुंदर हस्तनिर्मित गणपती मूर्तींचा संग्रह | Handcrafted Ganapati Murtis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="mr" className={`${spaceGrotesk.variable} ${notoDevanagari.variable}`}>
      <body>{children}</body>
    </html>
  )
}
