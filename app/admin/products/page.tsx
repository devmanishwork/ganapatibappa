'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AdminSidebar from '@/components/AdminSidebar'

interface Product {
  id: number
  productId: string
  nameMarathi: string
  name: string | null
  height: string
  price: number
  status: 'AVAILABLE' | 'BOOKED' | 'OUT_OF_STOCK'
  featured: boolean
  images: string[]
}

type StatusType = 'AVAILABLE' | 'BOOKED' | 'OUT_OF_STOCK'

const STATUS_CYCLE: Record<StatusType, StatusType> = {
  AVAILABLE:    'BOOKED',
  BOOKED:       'OUT_OF_STOCK',
  OUT_OF_STOCK: 'AVAILABLE',
}

const STATUS_LABEL: Record<StatusType, string> = {
  AVAILABLE:    '✅ उपलब्ध',
  BOOKED:       '🔖 बुक',
  OUT_OF_STOCK: '❌ संपले',
}

const STATUS_CLASS: Record<StatusType, string> = {
  AVAILABLE:    'badge-available',
  BOOKED:       'badge-booked',
  OUT_OF_STOCK: 'badge-oos',
}

function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-[var(--gold)]" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [togglingId, setTogglingId] = useState<number | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [featuringId, setFeaturingId] = useState<number | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/products').catch(() => null)
    if (res?.ok) {
      const data = await res.json()
      const parsed = data.map((p: any) => ({
        ...p,
        images: typeof p.images === 'string' ? JSON.parse(p.images || '[]') : (p.images || []),
      }))
      setProducts(parsed)
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const filteredProducts = products.filter(p => {
    const matchSearch =
      p.nameMarathi.toLowerCase().includes(search.toLowerCase()) ||
      (p.name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
      p.productId.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'ALL' || p.status === statusFilter
    return matchSearch && matchStatus
  })

  const handleStatusToggle = async (product: Product) => {
    setTogglingId(product.id)
    const newStatus = STATUS_CYCLE[product.status]
    const res = await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, status: newStatus }),
    })
    if (res.ok) {
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, status: newStatus } : p))
    }
    setTogglingId(null)
  }

  const handleFeaturedToggle = async (product: Product) => {
    setFeaturingId(product.id)
    const res = await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, featured: !product.featured }),
    })
    if (res.ok) {
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, featured: !p.featured } : p))
    }
    setFeaturingId(null)
  }

  const handleDelete = async (product: Product) => {
    if (!confirm(`"${product.nameMarathi}" हटवायचे आहे का?`)) return
    setDeletingId(product.id)
    await fetch(`/api/products/${product.id}`, { method: 'DELETE' })
    setProducts(prev => prev.filter(p => p.id !== product.id))
    setDeletingId(null)
  }

  return (
    <div className="flex min-h-screen bg-[var(--cream)]">
      <AdminSidebar activeSection="products" />

      <main className="flex-1 p-6 md:p-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-[var(--burgundy)]">🪔 मूर्ती यादी</h1>
          <Link href="/admin/products/add" className="btn-gold w-fit">
            ➕ नवीन मूर्ती
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="🔍 नाव किंवा ID शोधा..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="field flex-1"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="field sm:w-48"
          >
            <option value="ALL">सर्व स्थिती</option>
            <option value="AVAILABLE">उपलब्ध</option>
            <option value="BOOKED">बुक केले</option>
            <option value="OUT_OF_STOCK">संपले</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24 gap-3 text-stone-400">
            <Spinner />
            <span>लोड होत आहे...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center border-2 border-dashed border-stone-200 rounded-2xl bg-white">
            <div className="text-5xl">🪔</div>
            <div>
              <p className="font-marathi font-bold text-stone-600">कोणतीही मूर्ती आढळली नाही</p>
              <p className="text-stone-400 text-sm mt-1">शोध किंवा फिल्टर बदलून पाहा</p>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block admin-card overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead style={{ background: 'var(--burgundy)' }}>
                    <tr className="text-[var(--gold)] text-xs uppercase tracking-wider">
                      <th className="px-4 py-3 text-left font-semibold">फोटो</th>
                      <th className="px-4 py-3 text-left font-semibold">ID</th>
                      <th className="px-4 py-3 text-left font-semibold">नाव</th>
                      <th className="px-4 py-3 text-left font-semibold">उंची</th>
                      <th className="px-4 py-3 text-left font-semibold">किंमत</th>
                      <th className="px-4 py-3 text-left font-semibold">स्थिती</th>
                      <th className="px-4 py-3 text-center font-semibold">⭐</th>
                      <th className="px-4 py-3 text-center font-semibold">क्रिया</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="border-b border-stone-100 hover:bg-[var(--cream)]/50 transition-colors">
                        <td className="px-4 py-3">
                          {product.images[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.nameMarathi}
                              width={40}
                              height={40}
                              className="rounded-lg object-cover border border-stone-200"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-lg">🪔</div>
                          )}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-stone-500">{product.productId}</td>
                        <td className="px-4 py-3">
                          <p className="font-marathi font-bold text-stone-800">{product.nameMarathi}</p>
                          {product.name && <p className="text-xs text-stone-400">{product.name}</p>}
                        </td>
                        <td className="px-4 py-3 text-stone-600 text-xs">{product.height}</td>
                        <td className="px-4 py-3 font-bold text-[var(--maroon)]">₹{product.price.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleStatusToggle(product)}
                            disabled={togglingId === product.id}
                            className={`${STATUS_CLASS[product.status]} cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50`}
                          >
                            {togglingId === product.id ? '...' : STATUS_LABEL[product.status]}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleFeaturedToggle(product)}
                            disabled={featuringId === product.id}
                            title={product.featured ? 'Featured हटवा' : 'Featured करा'}
                            className="text-xl hover:scale-110 transition-transform disabled:opacity-50"
                          >
                            {product.featured ? '⭐' : '☆'}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              href={`/admin/products/edit/${product.id}`}
                              className="text-xs font-semibold bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              ✏️ संपादित
                            </Link>
                            <button
                              onClick={() => handleDelete(product)}
                              disabled={deletingId === product.id}
                              className="text-xs font-semibold bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                            >
                              {deletingId === product.id ? '...' : '🗑️ हटवा'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile card grid */}
            <div className="md:hidden grid gap-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="admin-card flex gap-3">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.nameMarathi}
                      width={64}
                      height={64}
                      className="rounded-xl object-cover border border-stone-200 shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-stone-100 flex items-center justify-center text-2xl shrink-0">🪔</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-marathi font-bold text-stone-800 text-sm">{product.nameMarathi}</p>
                        <p className="text-xs text-stone-400 font-mono">{product.productId}</p>
                      </div>
                      <button onClick={() => handleFeaturedToggle(product)} className="text-xl shrink-0">
                        {product.featured ? '⭐' : '☆'}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-[var(--maroon)] text-sm">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="text-stone-400 text-xs">·</span>
                      <span className="text-stone-500 text-xs">{product.height}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <button
                        onClick={() => handleStatusToggle(product)}
                        className={`${STATUS_CLASS[product.status]} cursor-pointer text-xs`}
                      >
                        {STATUS_LABEL[product.status]}
                      </button>
                      <Link href={`/admin/products/edit/${product.id}`} className="text-xs bg-blue-50 border border-blue-200 text-blue-700 px-2 py-1 rounded-lg">
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(product)}
                        disabled={deletingId === product.id}
                        className="text-xs bg-red-50 border border-red-200 text-red-600 px-2 py-1 rounded-lg disabled:opacity-50"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-stone-400 mt-4 text-right">{filteredProducts.length} मूर्ती दाखवत आहे</p>
          </>
        )}
      </main>
    </div>
  )
}
