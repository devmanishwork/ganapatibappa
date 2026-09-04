'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'मुख्यपृष्ठ', href: '/' },
  { label: 'गणपती मूर्ती', href: '/#catalog' },
  { label: 'आमच्याबद्दल', href: '/#about' },
  { label: 'संपर्क', href: '/#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-[#1e0202] border-b-2 border-[var(--gold)] sticky top-0 z-50 shadow-md">
      <div className="section-wrapper py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-[var(--maroon)] border border-[var(--gold)]/60 flex items-center justify-center text-[var(--gold-bright)] font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            ॐ
          </div>
          <div>
            <p className="font-marathi font-bold text-[var(--gold-bright)] text-sm md:text-base leading-tight">
              श्री सिद्धिविनायक
            </p>
            <p className="font-marathi text-[var(--cream)]/80 text-[11px] leading-tight tracking-wider">
              गणपती स्टॉल · चाळीसगाव
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="font-marathi text-[var(--cream)] hover:text-[var(--gold-bright)] text-sm font-semibold transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop WhatsApp CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/919637153890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm border border-emerald-700"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp संपर्क</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden text-[var(--gold-bright)] p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#150101] border-t border-[var(--gold)]/30 px-5 py-4 flex flex-col gap-3">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-marathi text-[var(--cream)] hover:text-[var(--gold-bright)] font-semibold text-sm py-2 border-b border-white/5"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://wa.me/919637153890"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-xs py-3"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: 9637153890</span>
            </a>
            <a
              href="https://wa.me/918766048648"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-xs py-3 bg-emerald-700 hover:bg-emerald-600"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: 8766048648</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
