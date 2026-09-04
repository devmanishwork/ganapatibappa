'use client'

import { Phone, MessageCircle } from 'lucide-react'

export default function AnnouncementBar({ text }: { text: string }) {
  const content = (
    <div className="flex items-center gap-8 text-xs font-semibold tracking-wide whitespace-nowrap">
      <span className="font-marathi text-[var(--gold-bright)] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-bright)] animate-pulse" />
        {text || 'श्री सिद्धिविनायक गणपती स्टॉल — चाळीसगाव'}
      </span>
      <span className="text-[var(--gold)]/40">•</span>
      <span className="font-marathi text-[var(--cream)]">गणपती बाप्पा मोरया! मंगलमूर्ती मोरया!</span>
      <span className="text-[var(--gold)]/40">•</span>
      <a
        href="https://wa.me/919637153890"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-[var(--gold-bright)] hover:underline font-mono"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        9637153890
      </a>
      <span className="text-[var(--gold)]/40">•</span>
      <a
        href="https://wa.me/918766048648"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-[var(--gold-bright)] hover:underline font-mono"
      >
        <Phone className="w-3.5 h-3.5" />
        8766048648
      </a>
      <span className="text-[var(--gold)]/40">•</span>
      <span className="font-marathi text-[var(--cream)]/90">छत्रपती शिवाजी महाराज चौक, चाळीसगाव</span>
    </div>
  )

  return (
    <div className="bg-[#1e0202] text-[var(--gold-bright)] py-2 overflow-hidden border-b border-[var(--gold)]/20 relative select-none">
      <div className="flex w-max marquee-track">
        <div className="flex items-center gap-8 pr-8">{content}</div>
        <div className="flex items-center gap-8 pr-8" aria-hidden="true">{content}</div>
        <div className="flex items-center gap-8 pr-8" aria-hidden="true">{content}</div>
        <div className="flex items-center gap-8 pr-8" aria-hidden="true">{content}</div>
      </div>
    </div>
  )
}
