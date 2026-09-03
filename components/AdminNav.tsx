'use client'

import { useRouter } from 'next/navigation'

export default function AdminNav() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🕉️</span>
          <div>
            <h1 className="font-bold text-lg leading-tight">Admin Panel</h1>
            <p className="text-orange-200 text-xs">श्री सिद्धिविनायक गणपती स्टॉल</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="text-sm text-orange-100 hover:text-white underline"
          >
            🌐 Website पहा
          </a>
          <button
            onClick={handleLogout}
            className="bg-orange-700 hover:bg-orange-800 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            बाहेर पडा
          </button>
        </div>
      </div>
    </header>
  )
}
