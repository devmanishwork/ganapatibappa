'use client'

import { useRouter } from 'next/navigation'

export default function AdminNav() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <header className="bg-[#0F0A00] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-lg font-black text-white shrink-0">
            🕉
          </div>
          <div>
            <h1 className="font-bold text-white text-sm leading-none">Admin Panel</h1>
            <p className="font-marathi text-orange-500 text-xs mt-0.5">श्री सिद्धिविनायक गणपती स्टॉल</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-stone-400 hover:text-white text-xs font-semibold transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Website
          </a>
          <button
            onClick={handleLogout}
            className="text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-lg transition-colors"
          >
            बाहेर पडा
          </button>
        </div>
      </div>
    </header>
  )
}
