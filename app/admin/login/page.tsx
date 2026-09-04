'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
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
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'चुकीचा पासवर्ड. कृपया पुन्हा प्रयत्न करा.')
      }
    } catch {
      setError('काहीतरी चुकीचे झाले. कृपया पुन्हा प्रयत्न करा.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-[#180101]"
    >
      <div
        className="w-full max-w-sm bg-white rounded-3xl p-8 border-2 border-[var(--gold)] shadow-xl"
      >
        {/* Emblem */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-[var(--maroon)] border-2 border-[var(--gold)] flex items-center justify-center text-[var(--gold-bright)] text-2xl font-bold shadow-sm">
            ॐ
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-center text-stone-900 mb-0.5">
          Admin Portal Login
        </h1>
        <p className="font-marathi text-center mb-6 text-xs font-semibold text-[var(--maroon)]">
          श्री सिद्धिविनायक गणपती स्टॉल
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="पासवर्ड टाका"
              required
              className="field text-center tracking-widest pr-10 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 transition-colors"
              tabIndex={-1}
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-rose-700 text-xs font-medium text-center font-marathi">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="btn-maroon w-full py-3 text-xs font-bold disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                <span>लॉगिन होत आहे...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>लॉगिन करा</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
