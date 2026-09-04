'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Search, Edit3, Trash2, Star, CheckCircle2, Bookmark, XCircle, Loader2, ImageIcon } from 'lucide-react'
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
  AVAILABLE:    'उपलब्ध',
  BOOKED:       'बुक केले',
  OUT_OF_STOCK: 'संपले',
}

const STATUS_CLASS: Record<StatusType, string> = {
  AVAILABLE:    'bg-emerald-50 text-emerald-800 border-emerald-300',
  BOOKED:       'bg-amber-50 text-amber-800 border-amber-300',
  OUT_OF_STOCK: 'bg-rose-50 text-rose-800 border-rose-300',
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
    if (!confirm(`"${product.nameMarathi}" ही मूर्ती हटवायची आहे का?`)) return
    setDeletingId(product.id)
    await fetch(`/api/products/${product.id}`, { method: 'DELETE' })
    setProducts(prev => prev.filter(p => p.id !== product.id))
    setDeletingId(null)
  }

  return (
    <div className="flex min-h-screen bg-[var(--cream)]">
      <AdminSidebar activeSection="products" />

      <main className="flex-1 p-6 md:p-8 max-w-7xl">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold font-marathi text-[var(--maroon)]">मूर्ती व्यवस्थापन</h1>
            <p className="text-xs text-[var(--muted)] mt-0.5">सर्व उपलब्ध, बुक आणि संपलेल्या मूर्तींची यादी</p>
          </div>
          <Link href="/admin/products/add" className="btn-gold text-xs py-2.5 px-4 flex items-center gap-1.5 w-fit">
            <Plus className="w-4 h-4" />
            <span>नवीन मूर्ती जोडा</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 bg-white p-4 rounded-xl border border-stone-200">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="नाव किंवा आयडीने शोधा..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="field pl-9 font-marathi text-xs"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="field sm:w-48 font-marathi text-xs cursor-pointer"
          >
            <option value="ALL">सर्व स्थिती (All)</option>
            <option value="AVAILABLE">उपलब्ध (Available)</option>
            <option value="BOOKED">बुक केलेले (Booked)</option>
            <option value="OUT_OF_STOCK">संपले (Out of Stock)</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 gap-2 text-stone-400">
            <Loader2 className="animate-spin w-5 h-5 text-[var(--gold)]" />
            <span className="text-xs font-semibold">लोड होत आहे...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center border-2 border-dashed border-stone-200 rounded-2xl bg-white p-6">
            <ImageIcon className="w-10 h-10 text-stone-300" />
            <div>
              <p className="font-marathi font-bold text-stone-700 text-sm">कोणतीही मूर्ती आढळली नाही</p>
              <p className="text-stone-400 text-xs mt-0.5">नवीन मूर्ती जोडण्यासाठी वरील बटणावर क्लिक करा</p>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block admin-card overflow-hidden p-0 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead style={{ background: '#1c0202' }}>
                    <tr className="text-[var(--gold-bright)] uppercase tracking-wider text-[11px]">
                      <th className="px-4 py-3 text-left font-semibold">फोटो</th>
                      <th className="px-4 py-3 text-left font-semibold">आयडी</th>
                      <th className="px-4 py-3 text-left font-semibold">नाव</th>
                      <th className="px-4 py-3 text-left font-semibold">उंची</th>
                      <th className="px-4 py-3 text-left font-semibold">किंमत</th>
                      <th className="px-4 py-3 text-left font-semibold">स्थिती (क्लिक करून बदला)</th>
                      <th className="px-4 py-3 text-center font-semibold">Featured</th>
                      <th className="px-4 py-3 text-center font-semibold">क्रिया</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-amber-50/40 transition-colors">
                        <td className="px-4 py-3">
                          {product.images[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.nameMarathi}
                              width={44}
                              height={44}
                              className="rounded-lg object-cover border border-stone-200 aspect-square"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 font-mono font-semibold text-stone-600">{product.productId}</td>
                        <td className="px-4 py-3">
                          <p className="font-marathi font-bold text-stone-900 text-xs">{product.nameMarathi}</p>
                          {product.name && <p className="text-[11px] text-stone-400">{product.name}</p>}
                        </td>
                        <td className="px-4 py-3 text-stone-600 font-marathi">{product.height}</td>
                        <td className="px-4 py-3 font-bold text-[var(--maroon)] text-sm">₹{product.price.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleStatusToggle(product)}
                            disabled={togglingId === product.id}
                            className={`px-2.5 py-1 rounded-full border text-[11px] font-bold font-marathi cursor-pointer transition-all disabled:opacity-50 flex items-center gap-1 ${STATUS_CLASS[product.status]}`}
                          >
                            {product.status === 'AVAILABLE' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                            {product.status === 'BOOKED' && <Bookmark className="w-3 h-3 text-amber-600" />}
                            {product.status === 'OUT_OF_STOCK' && <XCircle className="w-3 h-3 text-rose-600" />}
                            <span>{togglingId === product.id ? 'बदलत आहे...' : STATUS_LABEL[product.status]}</span>
                          </button>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleFeaturedToggle(product)}
                            disabled={featuringId === product.id}
                            title={product.featured ? 'Featured हटवा' : 'Featured करा'}
                            className="p-1 hover:scale-110 transition-transform disabled:opacity-50"
                          >
                            <Star className={`w-4 h-4 ${product.featured ? 'fill-amber-500 text-amber-500' : 'text-stone-300 hover:text-stone-500'}`} />
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              href={`/admin/products/edit/${product.id}`}
                              className="text-xs font-semibold bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>संपादित</span>
                            </Link>
                            <button
                              onClick={() => handleDelete(product)}
                              disabled={deletingId === product.id}
                              className="text-xs font-semibold bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>{deletingId === product.id ? '...' : 'हटवा'}</span>
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
            <div className="md:hidden grid gap-3">
              {filteredProducts.map(product => (
                <div key={product.id} className="admin-card flex gap-3 bg-white p-3.5">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.nameMarathi}
                      width={64}
                      height={64}
                      className="rounded-xl object-cover border border-stone-200 shrink-0 aspect-square"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-stone-100 flex items-center justify-center text-stone-400 shrink-0">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <p className="font-marathi font-bold text-stone-900 text-xs">{product.nameMarathi}</p>
                        <p className="text-[10px] text-stone-400 font-mono">{product.productId}</p>
                      </div>
                      <button onClick={() => handleFeaturedToggle(product)} className="p-1">
                        <Star className={`w-4 h-4 ${product.featured ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}`} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-[var(--maroon)] text-xs">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="text-stone-400 text-[10px]">·</span>
                      <span className="text-stone-600 text-[10px] font-marathi">{product.height}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleStatusToggle(product)}
                        className={`px-2 py-0.5 rounded-full border text-[10px] font-bold font-marathi ${STATUS_CLASS[product.status]}`}
                      >
                        {STATUS_LABEL[product.status]}
                      </button>
                      <Link href={`/admin/products/edit/${product.id}`} className="text-xs bg-blue-50 border border-blue-200 text-blue-700 p-1.5 rounded-lg">
                        <Edit3 className="w-3 h-3" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product)}
                        disabled={deletingId === product.id}
                        className="text-xs bg-rose-50 border border-rose-200 text-rose-600 p-1.5 rounded-lg disabled:opacity-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-stone-400 mt-4 text-right">एकूण {filteredProducts.length} मूर्ती</p>
          </>
        )}
      </main>
    </div>
  )
}
