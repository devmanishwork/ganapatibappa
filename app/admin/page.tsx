'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminSidebar from '@/components/AdminSidebar'

interface Product {
  id: number
  productId: string
  nameMarathi: string
  name: string | null
  height: string
  price: number
  status: string
  featured: boolean
  images: string[]
}

interface Category {
  id: number
  name: string
  nameMarathi: string | null
}

interface GalleryItem {
  id: number
  url: string
}

interface Inquiry {
  id: number
  name: string
  phone: string
  productId: string | null
  message: string | null
  createdAt: string
}

function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-[var(--gold)]" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()).catch(() => []),
      fetch('/api/categories').then(r => r.json()).catch(() => []),
      fetch('/api/gallery').then(r => r.json()).catch(() => []),
      fetch('/api/inquiries').then(r => r.json()).catch(() => []),
    ]).then(([p, c, g, i]) => {
      const parsedProducts = Array.isArray(p) ? p.map((prod: any) => ({
        ...prod,
        images: typeof prod.images === 'string' ? JSON.parse(prod.images || '[]') : (prod.images || []),
      })) : []
      setProducts(parsedProducts)
      setCategories(Array.isArray(c) ? c : [])
      setGallery(Array.isArray(g) ? g : [])
      setInquiries(Array.isArray(i) ? i : [])
      setLoading(false)
    })
  }, [])

  const available  = products.filter(p => p.status === 'AVAILABLE').length
  const outOfStock = products.filter(p => p.status === 'OUT_OF_STOCK').length
  const booked     = products.filter(p => p.status === 'BOOKED').length
  const featured   = products.filter(p => p.featured).slice(0, 4)
  const recentInq  = [...inquiries].reverse().slice(0, 5)

  const statsMain = [
    { label: 'एकूण मूर्ती',  value: products.length, bg: 'bg-[var(--maroon)]',  fg: 'text-white'       },
    { label: 'उपलब्ध',       value: available,        bg: 'bg-green-700',        fg: 'text-white'       },
    { label: 'संपले',        value: outOfStock,       bg: 'bg-red-700',          fg: 'text-white'       },
    { label: 'बुक केले',     value: booked,           bg: 'bg-amber-600',        fg: 'text-white'       },
  ]

  const statsSecond = [
    { label: 'प्रकार',       value: categories.length, icon: '📂' },
    { label: 'गॅलरी',        value: gallery.length,    icon: '🖼️' },
    { label: 'चौकशी',        value: inquiries.length,  icon: '📋' },
  ]

  return (
    <div className="flex min-h-screen bg-[var(--cream)]">
      <AdminSidebar activeSection="dashboard" />

      <main className="flex-1 p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--burgundy)]">📊 डॅशबोर्ड</h1>
          <p className="text-stone-500 text-sm mt-1">श्री सिद्धिविनायक गणपती स्टॉल — Overview</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24 gap-3 text-stone-400">
            <Spinner />
            <span className="font-semibold">लोड होत आहे...</span>
          </div>
        ) : (
          <>
            {/* Main stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {statsMain.map(s => (
                <div key={s.label} className={`${s.bg} ${s.fg} rounded-2xl p-5 text-center border-2 border-black/10`}>
                  <div className="text-4xl font-black">{s.value}</div>
                  <div className="font-marathi text-sm opacity-80 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Secondary stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {statsSecond.map(s => (
                <div key={s.label} className="admin-card text-center py-5">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-3xl font-black text-[var(--maroon)]">{s.value}</div>
                  <div className="font-marathi text-sm text-stone-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="admin-card mb-8">
              <h2 className="font-bold text-[var(--maroon)] mb-4 text-lg">⚡ त्वरित क्रिया</h2>
              <div className="flex flex-wrap gap-3">
                <Link href="/admin/products/add" className="btn-gold">
                  ➕ नवीन मूर्ती जोडा
                </Link>
                <Link href="/admin/gallery" className="btn-maroon">
                  📸 Gallery मध्ये फोटो जोडा
                </Link>
              </div>
            </div>

            {/* Recent inquiries */}
            <div className="admin-card mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-[var(--maroon)] text-lg">📋 अलीकडील चौकशी</h2>
                <Link href="/admin/inquiries" className="text-sm text-[var(--gold)] font-semibold hover:underline">
                  सर्व पाहा →
                </Link>
              </div>
              {recentInq.length === 0 ? (
                <p className="text-stone-400 text-sm text-center py-6">अजून कोणतीही चौकशी नाही.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-stone-400 uppercase border-b border-stone-100">
                        <th className="pb-2 text-left font-semibold">नाव</th>
                        <th className="pb-2 text-left font-semibold">फोन</th>
                        <th className="pb-2 text-left font-semibold">Product ID</th>
                        <th className="pb-2 text-left font-semibold">दिनांक</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentInq.map(inq => (
                        <tr key={inq.id} className="border-b border-stone-50 hover:bg-stone-50">
                          <td className="py-2.5 font-medium text-stone-800">{inq.name}</td>
                          <td className="py-2.5 text-stone-600">{inq.phone}</td>
                          <td className="py-2.5 text-stone-500 font-mono text-xs">{inq.productId || '—'}</td>
                          <td className="py-2.5 text-stone-400 text-xs">
                            {new Date(inq.createdAt).toLocaleDateString('mr-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Featured products */}
            {featured.length > 0 && (
              <div className="admin-card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-[var(--maroon)] text-lg">⭐ Featured मूर्ती</h2>
                  <Link href="/admin/products" className="text-sm text-[var(--gold)] font-semibold hover:underline">
                    सर्व पाहा →
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {featured.map(p => (
                    <div key={p.id} className="rounded-xl border-2 border-[var(--border)] p-3 text-center bg-[var(--gold-light)]/40">
                      {p.images[0] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.images[0]}
                          alt={p.nameMarathi}
                          className="w-16 h-16 object-cover rounded-lg mx-auto mb-2 border border-stone-200"
                        />
                      )}
                      <p className="font-marathi text-xs font-bold text-stone-800 truncate">{p.nameMarathi}</p>
                      <p className="text-xs text-[var(--gold)] font-bold mt-0.5">₹{p.price.toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
