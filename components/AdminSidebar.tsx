'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface NavItem {
  icon: string
  label: string
  href: string
  section: string
}

const navItems: NavItem[] = [
  { icon: '📊', label: 'डॅशबोर्ड',  href: '/admin',             section: 'dashboard'  },
  { icon: '🪔', label: 'मूर्ती',    href: '/admin/products',    section: 'products'   },
  { icon: '📂', label: 'प्रकार',    href: '/admin/categories',  section: 'categories' },
  { icon: '🖼️', label: 'गॅलरी',    href: '/admin/gallery',     section: 'gallery'    },
  { icon: '🎉', label: 'ऑफर',       href: '/admin/campaigns',   section: 'campaigns'  },
  { icon: '📋', label: 'चौकशी',     href: '/admin/inquiries',   section: 'inquiries'  },
]

export default function AdminSidebar({ activeSection }: { activeSection: string }) {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛕</span>
          <div>
            <p className="font-bold text-[var(--gold)] text-sm leading-none">
              सिद्धिविनायक स्टॉल
            </p>
            <p className="text-white/40 text-xs mt-1">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.section
          return (
            <Link
              key={item.section}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-marathi font-semibold text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-[var(--gold)] text-[var(--burgundy)]'
                  : 'text-[var(--cream)]/70 hover:bg-[var(--gold)]/20 hover:text-[var(--cream)]'
              }`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-300 hover:bg-red-900/40 hover:text-red-200 transition-all duration-150"
        >
          <span>🚪</span>
          <span>बाहेर पडा</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col w-60 shrink-0 min-h-screen sticky top-0"
        style={{ background: '#260303' }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 border-b border-white/10"
        style={{ background: '#260303' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🛕</span>
          <span className="font-bold text-[var(--gold)] text-sm font-marathi">
            सिद्धिविनायक स्टॉल
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white/70 hover:text-white p-1.5"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 bottom-0 z-40 w-64 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: '#260303' }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile spacer */}
      <div className="md:hidden h-[52px] w-full" />
    </>
  )
}
