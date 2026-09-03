'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [show, setShow]         = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const d = await res.json()
        setError(d.error || 'चुकीचा पासवर्ड / Wrong password')
      }
    } catch {
      setError('पुन्हा प्रयत्न करा / Try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0A00] flex items-center justify-center px-4">

      {/* Decorative rings */}
      <div className="pointer-events-none fixed -top-32 -right-32 w-96 h-96 rounded-full border-[48px] border-orange-900/20" />
      <div className="pointer-events-none fixed -bottom-24 -left-24 w-72 h-72 rounded-full border-[36px] border-orange-900/15" />

      <div className="relative w-full max-w-sm">

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 border-2 border-stone-200 shadow-[8px_8px_0px_#F4600C]">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center text-3xl shadow-[4px_4px_0px_#7C2D00]">
              🕉️
            </div>
          </div>

          <h1 className="text-center text-xl font-black text-stone-900 mb-1">Admin Login</h1>
          <p className="font-marathi text-center text-sm text-stone-400 mb-7">
            श्री सिद्धिविनायक गणपती स्टॉल
          </p>

          {error && (
            <div className="mb-4 flex items-center gap-2 bg-red-50 border-2 border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
              <span className="shrink-0">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Password / पासवर्ड
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="field pr-10 text-center text-lg tracking-[0.3em]"
                />
                <button
                  type="button"
                  onClick={() => setShow(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {show
                    ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  }
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? <><span className="animate-spin">⏳</span> लॉगिन होत आहे...</>
                : '🔐 लॉगिन करा'}
            </button>
          </form>

          <p className="font-marathi text-center text-xs text-stone-300 mt-6">
            🙏 गणपती बाप्पा मोरया
          </p>
        </div>
      </div>
    </div>
  )
}
