'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Image as ImageIcon,
  Sparkles,
  Inbox,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

interface NavItem {
  icon: any
  label: string
  href: string
  section: string
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'डॅशबोर्ड', href: '/admin', section: 'dashboard' },
  { icon: Package, label: 'मूर्ती यादी', href: '/admin/products', section: 'products' },
  { icon: FolderTree, label: 'प्रकार (Categories)', href: '/admin/categories', section: 'categories' },
  { icon: ImageIcon, label: 'गॅलरी (Gallery)', href: '/admin/gallery', section: 'gallery' },
  { icon: Sparkles, label: 'ऑफर व सूचना', href: '/admin/campaigns', section: 'campaigns' },
  { icon: Inbox, label: 'ग्राहक चौकशी', href: '/admin/inquiries', section: 'inquiries' },
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
          <div className="w-8 h-8 rounded-lg bg-[var(--maroon)] border border-[var(--gold)]/50 flex items-center justify-center text-[var(--gold-bright)] font-bold text-base shadow-sm">
            ॐ
          </div>
          <div>
            <p className="font-bold text-[var(--gold)] text-sm leading-none font-marathi">
              सिद्धिविनायक स्टॉल
            </p>
            <p className="text-white/40 text-[11px] mt-1">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.section
          return (
            <Link
              key={item.section}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-marathi font-semibold text-xs transition-all duration-150 ${
                isActive
                  ? 'bg-[var(--gold)] text-[var(--burgundy)] shadow-sm'
                  : 'text-[var(--cream)]/75 hover:bg-[var(--gold)]/20 hover:text-[var(--cream)]'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* View site & Logout */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-[var(--cream)]/70 hover:bg-white/10 hover:text-white transition-all font-marathi"
        >
          <span>🌐</span>
          <span>वेबसाइट पाहा</span>
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-900/40 hover:text-rose-200 transition-all font-marathi"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>बाहेर पडा (Logout)</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col w-60 shrink-0 min-h-screen sticky top-0"
        style={{ background: '#1c0202' }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 border-b border-white/10"
        style={{ background: '#1c0202' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[var(--maroon)] border border-[var(--gold)]/50 flex items-center justify-center text-[var(--gold-bright)] text-xs font-bold">
            ॐ
          </div>
          <span className="font-bold text-[var(--gold)] text-xs font-marathi">
            सिद्धिविनायक Admin
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white/70 hover:text-white p-1"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 bottom-0 z-40 w-64 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: '#1c0202' }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile spacer */}
      <div className="md:hidden h-[49px] w-full" />
    </>
  )
}
