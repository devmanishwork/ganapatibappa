'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import AdminNav from '@/components/AdminNav'

interface Murti {
  id: number
  name: string
  nameMarathi: string | null
  size: string
  price: number
  imageUrl: string
  status: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [murtis, setMurtis] = useState<Murti[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [togglingId, setTogglingId] = useState<number | null>(null)

  const fetchMurtis = async () => {
    const res = await fetch('/api/murtis')
    if (res.ok) {
      setMurtis(await res.json())
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMurtis()
  }, [])

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`"${name}" हटवायचे आहे का? / Delete "${name}"?`)) return
    setDeletingId(id)
    await fetch(`/api/murtis/${id}`, { method: 'DELETE' })
    setMurtis((prev) => prev.filter((m) => m.id !== id))
    setDeletingId(null)
  }

  const handleToggleStatus = async (murti: Murti) => {
    setTogglingId(murti.id)
    const newStatus = murti.status === 'AVAILABLE' ? 'OUT_OF_STOCK' : 'AVAILABLE'
    const res = await fetch(`/api/murtis/${murti.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...murti, status: newStatus }),
    })
    if (res.ok) {
      setMurtis((prev) =>
        prev.map((m) => (m.id === murti.id ? { ...m, status: newStatus } : m))
      )
    }
    setTogglingId(null)
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <AdminNav />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats + Add button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100 text-center min-w-[80px]">
              <div className="text-2xl font-bold text-orange-600">{murtis.length}</div>
              <div className="text-xs text-gray-500 mt-0.5">एकूण</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 text-center min-w-[80px]">
              <div className="text-2xl font-bold text-green-600">
                {murtis.filter((m) => m.status === 'AVAILABLE').length}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">उपलब्ध</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-red-100 text-center min-w-[80px]">
              <div className="text-2xl font-bold text-red-500">
                {murtis.filter((m) => m.status === 'OUT_OF_STOCK').length}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">संपले</div>
            </div>
          </div>

          <Link
            href="/admin/add"
            className="btn-saffron flex items-center gap-2 justify-center"
          >
            ➕ नवीन मूर्ती जोडा
          </Link>
        </div>

        {/* Table / Cards */}
        {loading ? (
          <div className="text-center py-16 text-orange-400 text-lg">लोड होत आहे... 🔄</div>
        ) : murtis.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-orange-100">
            <div className="text-5xl mb-4">🪔</div>
            <p className="text-lg font-medium text-gray-600">अजून कोणतीही मूर्ती जोडलेली नाही</p>
            <p className="text-sm text-gray-400 mt-1 mb-6">No murtis added yet</p>
            <Link href="/admin/add" className="btn-saffron inline-flex">
              ➕ पहिली मूर्ती जोडा
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {murtis.map((murti) => (
              <div
                key={murti.id}
                className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden flex gap-4 p-4 hover:shadow-md transition-shadow"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-orange-50">
                  <Image
                    src={murti.imageUrl}
                    alt={murti.nameMarathi || murti.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {murti.nameMarathi || murti.name}
                  </h3>
                  <p className="text-xs text-gray-400 truncate">{murti.name}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-sm text-gray-600">📏 {murti.size}</span>
                    <span className="text-sm font-bold text-orange-600">
                      ₹{murti.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {/* Toggle Status */}
                    <button
                      onClick={() => handleToggleStatus(murti)}
                      disabled={togglingId === murti.id}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-all ${
                        murti.status === 'AVAILABLE'
                          ? 'bg-green-100 text-green-700 border-green-200 hover:bg-red-100 hover:text-red-700 hover:border-red-200'
                          : 'bg-red-100 text-red-700 border-red-200 hover:bg-green-100 hover:text-green-700 hover:border-green-200'
                      } disabled:opacity-50`}
                    >
                      {togglingId === murti.id
                        ? '...'
                        : murti.status === 'AVAILABLE'
                        ? '✓ उपलब्ध'
                        : '✕ संपले'}
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 justify-center flex-shrink-0">
                  <Link
                    href={`/admin/edit/${murti.id}`}
                    className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-1.5 rounded-lg text-center transition-colors"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(murti.id, murti.nameMarathi || murti.name)}
                    disabled={deletingId === murti.id}
                    className="text-xs bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {deletingId === murti.id ? '...' : '🗑️ Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
