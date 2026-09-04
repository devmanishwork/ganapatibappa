'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Package,
  CheckCircle2,
  XCircle,
  Bookmark,
  FolderTree,
  Image as ImageIcon,
  Inbox,
  Plus,
  ArrowRight,
  Star,
  Loader2,
} from 'lucide-react'
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

  const available = products.filter(p => p.status === 'AVAILABLE').length
  const outOfStock = products.filter(p => p.status === 'OUT_OF_STOCK').length
  const booked = products.filter(p => p.status === 'BOOKED').length
  const featured = products.filter(p => p.featured).slice(0, 4)
  const recentInq = [...inquiries].reverse().slice(0, 5)

  const statsMain = [
    { label: 'एकूण मूर्ती', value: products.length, icon: Package, bg: 'bg-[var(--maroon)]', fg: 'text-white' },
    { label: 'उपलब्ध मूर्ती', value: available, icon: CheckCircle2, bg: 'bg-emerald-700', fg: 'text-white' },
    { label: 'बुक केलेल्या', value: booked, icon: Bookmark, bg: 'bg-amber-600', fg: 'text-white' },
    { label: 'संपलेल्या मूर्ती', value: outOfStock, icon: XCircle, bg: 'bg-rose-700', fg: 'text-white' },
  ]

  const statsSecond = [
    { label: 'प्रकार (Categories)', value: categories.length, icon: FolderTree },
    { label: 'गॅलरी फोटो', value: gallery.length, icon: ImageIcon },
    { label: 'ग्राहक चौकशी', value: inquiries.length, icon: Inbox },
  ]

  return (
    <div className="flex min-h-screen bg-[var(--cream)]">
      <AdminSidebar activeSection="dashboard" />

      <main className="flex-1 p-6 md:p-8 max-w-7xl">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--burgundy)] font-marathi">डॅशबोर्ड Overview</h1>
            <p className="text-stone-500 text-xs mt-0.5">श्री सिद्धिविनायक गणपती स्टॉल · चाळीसगाव</p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin/products/add" className="btn-gold text-xs py-2 px-3.5 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>नवीन मूर्ती</span>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 gap-2 text-stone-400">
            <Loader2 className="animate-spin w-5 h-5 text-[var(--gold)]" />
            <span className="text-xs font-semibold">लोड होत आहे...</span>
          </div>
        ) : (
          <>
            {/* Main stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-6">
              {statsMain.map(s => {
                const Icon = s.icon
                return (
                  <div key={s.label} className={`${s.bg} ${s.fg} rounded-2xl p-4 md:p-5 shadow-xs border border-black/10`}>
                    <div className="flex items-center justify-between mb-2 opacity-80">
                      <span className="font-marathi text-xs font-medium">{s.label}</span>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-3xl md:text-4xl font-black">{s.value}</div>
                  </div>
                )
              })}
            </div>

            {/* Secondary stats */}
            <div className="grid grid-cols-3 gap-3.5 mb-6">
              {statsSecond.map(s => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="bg-white rounded-xl border border-stone-200 p-4 text-center shadow-xs">
                    <Icon className="w-5 h-5 mx-auto mb-1 text-[var(--gold)]" />
                    <div className="text-2xl font-bold text-[var(--maroon)]">{s.value}</div>
                    <div className="font-marathi text-xs text-stone-500 mt-0.5">{s.label}</div>
                  </div>
                )
              })}
            </div>

            {/* Recent inquiries */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 mb-6 shadow-xs">
              <div className="flex items-center justify-between mb-3.5 border-b pb-2.5">
                <h2 className="font-bold text-[var(--maroon)] text-sm font-marathi flex items-center gap-1.5">
                  <Inbox className="w-4 h-4 text-[var(--gold)]" />
                  <span>अलीकडील ग्राहक चौकशी</span>
                </h2>
                <Link href="/admin/inquiries" className="text-xs text-[var(--maroon)] font-semibold hover:underline flex items-center gap-1">
                  <span>सर्व पाहा</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {recentInq.length === 0 ? (
                <p className="text-stone-400 text-xs text-center py-6 font-marathi">अजून कोणतीही चौकशी प्राप्त झालेली नाही.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-[11px] text-stone-400 uppercase border-b border-stone-100">
                        <th className="pb-2 text-left font-semibold">नाव</th>
                        <th className="pb-2 text-left font-semibold">फोन</th>
                        <th className="pb-2 text-left font-semibold">मूर्ती आयडी</th>
                        <th className="pb-2 text-left font-semibold">दिनांक</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                      {recentInq.map(inq => (
                        <tr key={inq.id} className="hover:bg-stone-50">
                          <td className="py-2.5 font-marathi font-medium text-stone-900">{inq.name}</td>
                          <td className="py-2.5 font-mono text-stone-600">{inq.phone}</td>
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
              <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3.5 border-b pb-2.5">
                  <h2 className="font-bold text-[var(--maroon)] text-sm font-marathi flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>होमपेज Featured मूर्ती</span>
                  </h2>
                  <Link href="/admin/products" className="text-xs text-[var(--maroon)] font-semibold hover:underline flex items-center gap-1">
                    <span>मूर्ती यादी</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {featured.map(p => (
                    <div key={p.id} className="rounded-xl border border-stone-200 p-2.5 text-center bg-stone-50">
                      {p.images[0] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.images[0]}
                          alt={p.nameMarathi}
                          className="w-16 h-16 object-cover rounded-lg mx-auto mb-2 border border-stone-200 aspect-square"
                        />
                      )}
                      <p className="font-marathi text-xs font-bold text-stone-900 truncate">{p.nameMarathi}</p>
                      <p className="text-xs text-[var(--maroon)] font-bold mt-0.5">₹{p.price.toLocaleString('en-IN')}</p>
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
