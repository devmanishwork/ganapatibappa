'use client'

import { useState, useMemo } from 'react'
import ProductCard from './ProductCard'

interface Product {
  id: number
  productId: string
  name: string
  nameMarathi: string | null
  description: string | null
  price: number
  height: string
  images: string
  status: string
  categoryId?: number | null
  category?: { id: number; name: string; nameMarathi: string | null } | null
}

interface Category {
  id: number
  name: string
  nameMarathi: string | null
  slug: string
}

export default function ProductGrid({
  initialProducts,
  categories,
}: {
  initialProducts: Product[]
  categories: Category[]
}) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [sort, setSort] = useState('newest')
  const [onlyAvailable, setOnlyAvailable] = useState(false)

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => {
      // Status filter
      if (onlyAvailable && p.status !== 'AVAILABLE') return false

      // Category filter
      if (selectedCategory !== null && p.categoryId !== selectedCategory) return false

      // Search filter
      if (search.trim()) {
        const query = search.toLowerCase().trim()
        const matchName = (p.name || '').toLowerCase().includes(query)
        const matchNameMr = (p.nameMarathi || '').toLowerCase().includes(query)
        const matchId = (p.productId || '').toLowerCase().includes(query)
        const matchHeight = (p.height || '').toLowerCase().includes(query)
        if (!matchName && !matchNameMr && !matchId && !matchHeight) return false
      }

      return true
    }).sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price
      if (sort === 'price_desc') return b.price - a.price
      return b.id - a.id
    })
  }, [initialProducts, search, selectedCategory, sort, onlyAvailable])

  return (
    <div className="space-y-8">
      {/* ── Search & Filter Controls ───────────────── */}
      <div className="bg-white p-4 md:p-6 rounded-2xl border-2 border-[var(--border)] shadow-[4px_4px_0px_var(--cream-dark)] flex flex-col gap-4">
        {/* Search bar & Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="मूर्ती शोधा... (नाव, आकार किंवा क्रमांक)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="field pl-10 font-marathi"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="field bg-white font-marathi shrink-0 sm:w-48 cursor-pointer"
            >
              <option value="newest">नवीन मूर्ती</option>
              <option value="price_asc">किंमत: कमी ते जास्त</option>
              <option value="price_desc">किंमत: जास्त ते कमी</option>
            </select>

            <button
              onClick={() => setOnlyAvailable(v => !v)}
              className={`px-4 py-2.5 rounded-xl border-2 font-marathi font-bold text-xs shrink-0 transition-all ${
                onlyAvailable
                  ? 'bg-green-600 text-white border-green-700 shadow-sm'
                  : 'bg-[var(--cream)] text-[var(--maroon)] border-[var(--border)] hover:bg-stone-100'
              }`}
            >
              {onlyAvailable ? '✓ फक्त उपलब्ध' : 'सर्व स्थिती'}
            </button>
          </div>
        </div>

        {/* Category Pills */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-1.5 rounded-full text-xs font-marathi font-bold transition-all shrink-0 border ${
                selectedCategory === null
                  ? 'bg-[var(--maroon)] text-[var(--gold-bright)] border-[var(--maroon)]'
                  : 'bg-[var(--cream)] text-[var(--maroon)] border-[var(--border)] hover:bg-[var(--cream-dark)]'
              }`}
            >
              सर्व मूर्ती ({initialProducts.length})
            </button>
            {categories.map(cat => {
              const count = initialProducts.filter(p => p.categoryId === cat.id).length
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-marathi font-bold transition-all shrink-0 border ${
                    selectedCategory === cat.id
                      ? 'bg-[var(--maroon)] text-[var(--gold-bright)] border-[var(--maroon)]'
                      : 'bg-[var(--cream)] text-[var(--maroon)] border-[var(--border)] hover:bg-[var(--cream-dark)]'
                  }`}
                >
                  {cat.nameMarathi || cat.name} ({count})
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Product Grid Results ───────────────────── */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center bg-white rounded-3xl border-2 border-dashed border-[var(--border)] p-8">
          <span className="text-5xl">🪔</span>
          <div>
            <h3 className="font-marathi text-xl font-bold text-[var(--maroon)]">कोणतीही मूर्ती सापडली नाही</h3>
            <p className="font-marathi text-sm text-[var(--muted)] mt-1">कृपया शोध शब्द बदला किंवा फिल्टर रीसेट करा.</p>
          </div>
          <button
            onClick={() => { setSearch(''); setSelectedCategory(null); setOnlyAvailable(false); }}
            className="btn-gold text-xs px-5 py-2.5"
          >
            सर्व मूर्ती पाहा
          </button>
        </div>
      ) : (
        <div>
          <p className="font-marathi text-xs font-bold text-[var(--muted)] mb-4">
            एकूण <strong className="text-[var(--maroon)]">{filteredProducts.length}</strong> मूर्ती उपलब्ध
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
