'use client'

import { MessageCircle, Navigation } from 'lucide-react'

const WA1 = '9637153890'

export default function FloatingWhatsApp() {
  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-3">
      <a
        href={`https://wa.me/91${WA1}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp वर संपर्क करा"
        className="w-13 h-13 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white transition-all hover:scale-110 group relative"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="font-marathi absolute right-16 bg-black/85 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          WhatsApp वर संपर्क करा
        </span>
      </a>
    </div>
  )
}

export function StickyMobileBar() {
  const mapUrl = 'https://www.google.com/maps?q=20.461901,75.006720'

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-[var(--gold)] p-2.5 flex gap-2 shadow-2xl">
      <a
        href={`https://wa.me/91${WA1}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5"
      >
        <MessageCircle className="w-4 h-4" />
        <span>WhatsApp संपर्क</span>
      </a>

      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5"
      >
        <Navigation className="w-4 h-4" />
        <span>दिशा मिळवा</span>
      </a>
    </div>
  )
}
