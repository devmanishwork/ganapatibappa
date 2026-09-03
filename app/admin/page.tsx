'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AdminNav from '@/components/AdminNav'

interface Murti {
  id: number; name: string; nameMarathi: string | null
  size: string; price: number; imageUrl: string; status: string
}

export default function AdminDashboard() {
  const [murtis, setMurtis]       = useState<Murti[]>([])
  const [loading, setLoading]     = useState(true)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [togglingId, setTogglingId] = useState<number | null>(null)

  const fetchMurtis = async () => {
    const res = await fetch('/api/murtis')
    if (res.ok) setMurtis(await res.json())
    setLoading(false)
  }
  useEffect(() => { fetchMurtis() }, [])

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`"${name}" हटवायचे आहे का?`)) return
    setDeletingId(id)
    await fetch(`/api/murtis/${id}`, { method: 'DELETE' })
    setMurtis(p => p.filter(m => m.id !== id))
    setDeletingId(null)
  }

  const handleToggle = async (murti: Murti) => {
    setTogglingId(murti.id)
    const newStatus = murti.status === 'AVAILABLE' ? 'OUT_OF_STOCK' : 'AVAILABLE'
    const res = await fetch(`/api/murtis/${murti.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...murti, status: newStatus }),
    })
    if (res.ok) setMurtis(p => p.map(m => m.id === murti.id ? { ...m, status: newStatus } : m))
    setTogglingId(null)
  }

  const available  = murtis.filter(m => m.status === 'AVAILABLE').length
  const outOfStock = murtis.filter(m => m.status === 'OUT_OF_STOCK').length

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <AdminNav />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">

        {/* ── Top bar ──────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">

          {/* Stats */}
          <div className="flex gap-3">
            {[
              { n: murtis.length, label: 'एकूण', bg: 'bg-stone-900', fg: 'text-white' },
              { n: available,     label: 'उपलब्ध', bg: 'bg-emerald-500', fg: 'text-white' },
              { n: outOfStock,    label: 'संपले', bg: 'bg-stone-200', fg: 'text-stone-600' },
            ].map(s => (
              <div key={s.label} className={`${s.bg} ${s.fg} rounded-xl px-4 py-3 text-center min-w-[72px] border-2 border-black/10`}>
                <div className="text-2xl font-black leading-none">{s.n}</div>
                <div className="font-marathi text-xs opacity-80 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <Link href="/admin/add" className="btn-primary">
            ➕ नवीन मूर्ती जोडा
          </Link>
        </div>

        {/* ── Content ──────────────────── */}
        {loading ? (
          <div className="flex items-center justify-center py-24 gap-3 text-stone-400">
            <svg className="animate-spin h-6 w-6 text-orange-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <span className="font-semibold">लोड होत आहे...</span>
          </div>

        ) : murtis.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center border-2 border-dashed border-stone-200 rounded-3xl bg-white">
            <div className="text-5xl">🪔</div>
            <div>
              <p className="font-marathi text-lg font-bold text-stone-600">अजून कोणतीही मूर्ती जोडलेली नाही</p>
              <p className="text-stone-400 text-sm mt-1">पहिली मूर्ती जोडा आणि सुरुवात करा</p>
            </div>
            <Link href="/admin/add" className="btn-primary">➕ पहिली मूर्ती जोडा</Link>
          </div>

        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {murtis.map(murti => {
              const isAvail = murti.status === 'AVAILABLE'
              return (
                <div key={murti.id} className="admin-card flex gap-4">

                  {/* Thumb */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0 border-2 border-stone-200">
                    <Image src={murti.imageUrl} alt={murti.nameMarathi || murti.name} fill className="object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-marathi font-bold text-stone-900 text-sm leading-tight truncate">
                      {murti.nameMarathi || murti.name}
                    </h3>
                    {murti.nameMarathi && (
                      <p className="text-xs text-stone-400 truncate">{murti.name}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-xs text-stone-500 font-medium">{murti.size}</span>
                      <span className="font-bold text-orange-600 text-sm">₹{murti.price.toLocaleString('en-IN')}</span>
                    </div>

                    {/* Status toggle */}
                    <button
                      onClick={() => handleToggle(murti)}
                      disabled={togglingId === murti.id}
                      className={`mt-2 text-xs font-bold px-2.5 py-1 rounded-full border-2 transition-all disabled:opacity-50 ${
                        isAvail
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
                          : 'bg-stone-100 border-stone-300 text-stone-500 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700'
                      }`}
                    >
                      {togglingId === murti.id ? '...' : isAvail ? '✓ उपलब्ध' : '✕ संपले'}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 shrink-0 justify-center">
                    <Link href={`/admin/edit/${murti.id}`}
                      className="text-xs font-semibold bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 text-orange-700 px-3 py-1.5 rounded-lg text-center transition-colors">
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(murti.id, murti.nameMarathi || murti.name)}
                      disabled={deletingId === murti.id}
                      className="text-xs font-semibold bg-red-50 hover:bg-red-100 border-2 border-red-200 text-red-600 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {deletingId === murti.id ? '...' : '🗑️'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
