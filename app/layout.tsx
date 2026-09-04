import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'श्री सिद्धिविनायक गणपती स्टॉल | गणपती मूर्ती चाळीसगाव',
  description: 'चाळीसगाव येथील श्री सिद्धिविनायक गणपती स्टॉल. सुंदर आणि आकर्षक गणपती मूर्ती विविध आकारांमध्ये उपलब्ध. मूर्ती पाहण्यासाठी आणि बुकिंगसाठी WhatsApp वर संपर्क करा.',
  keywords: 'गणपती मूर्ती चाळीसगाव, Ganapati Murti Chalisgaon, गणपती मूर्ती, Ganpati Murti, गणपती बाप्पा मूर्ती',
  openGraph: {
    title: 'श्री सिद्धिविनायक गणपती स्टॉल',
    description: 'सुंदर हस्तनिर्मित गणपती मूर्तींचा संग्रह — चाळीसगाव',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mr">
      <body>{children}</body>
    </html>
  )
}
