'use client'

import { useState, useEffect } from 'react'
import AdminSidebar from '@/components/AdminSidebar'

interface Category {
  id: number
  name: string
  nameMarathi: string | null
  slug: string
  _count?: { products: number }
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [nameMarathi, setNameMarathi] = useState('')
  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editMarathi, setEditMarathi] = useState('')
  const [editName, setEditName] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fetchCategories = async () => {
    setLoading(true)
    const res = await fetch('/api/categories')
    if (res.ok) setCategories(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchCategories() }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    setError('')
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `cat-${Date.now()}`

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, nameMarathi, slug }),
      })
      if (!res.ok) throw new Error('प्रकार जोडताना चूक झाली')
      setName('')
      setNameMarathi('')
      fetchCategories()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async (id: number) => {
    const slug = editName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `cat-${id}`
    const res = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName, nameMarathi: editMarathi, slug }),
    })
    if (res.ok) {
      setEditingId(null)
      fetchCategories()
    }
  }

  const handleDelete = async (id: number, catName: string) => {
    if (!confirm(`"${catName}" हा प्रकार हटवायचा आहे का?`)) return
    const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
    if (res.ok) fetchCategories()
  }

  return (
    <div className="flex min-h-screen bg-[var(--cream)]">
      <AdminSidebar activeSection="categories" />

      <main className="flex-1 p-6 md:p-10 max-w-5xl">
        <div className="mb-8">
          <h1 className="font-marathi text-2xl md:text-3xl font-bold text-[var(--maroon)]">
            📂 मूर्तीचे प्रकार (Categories)
          </h1>
          <p className="font-marathi text-xs text-[var(--muted)] mt-1">
            मूर्तींचे वर्गीकरण (उदा. लहान मूर्ती, मध्यम मूर्ती, मोठी मूर्ती, विशेष डिझाईन) व्यवस्थापित करा.
          </p>
        </div>

        {/* Add Category Form */}
        <div className="bg-white p-6 rounded-2xl border-2 border-stone-200 shadow-sm mb-8">
          <h2 className="font-marathi font-bold text-[var(--maroon)] text-base mb-4">
            ➕ नवीन प्रकार जोडा
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 text-xs p-3 rounded-xl mb-4 font-semibold">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="section-label block mb-1">मराठी नाव *</label>
              <input
                type="text"
                required
                placeholder="उदा. मध्यम मूर्ती"
                value={nameMarathi}
                onChange={e => setNameMarathi(e.target.value)}
                className="field font-marathi"
              />
            </div>
            <div>
              <label className="section-label block mb-1">English Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Medium Murti"
                value={name}
                onChange={e => setName(e.target.value)}
                className="field"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={saving}
                className="btn-gold w-full py-2.5 text-xs font-bold"
              >
                {saving ? 'जोडत आहे...' : '➕ प्रकार जोडा'}
              </button>
            </div>
          </form>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-[var(--maroon)] text-[var(--gold-bright)] font-marathi font-bold text-sm">
            उपलब्ध प्रकार ({categories.length})
          </div>

          {loading ? (
            <div className="p-8 text-center text-stone-400 font-marathi">लोड होत आहे...</div>
          ) : categories.length === 0 ? (
            <div className="p-8 text-center text-stone-400 font-marathi">अद्याप कोणताही प्रकार जोडलेला नाही.</div>
          ) : (
            <div className="divide-y divide-stone-100">
              {categories.map(cat => (
                <div key={cat.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50">
                  {editingId === cat.id ? (
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={editMarathi}
                        onChange={e => setEditMarathi(e.target.value)}
                        className="field font-marathi"
                        placeholder="मराठी नाव"
                      />
                      <input
                        type="text"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        className="field"
                        placeholder="English Name"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-marathi font-bold text-[var(--maroon)] text-base">
                        {cat.nameMarathi || cat.name}
                      </h3>
                      <p className="text-xs text-stone-400">
                        {cat.name} · slug: <code className="text-stone-500 font-mono">{cat.slug}</code>
                        {cat._count && <span className="ml-2 bg-[var(--cream)] text-[var(--burgundy)] px-2 py-0.5 rounded-full font-bold">({cat._count.products} मूर्ती)</span>}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 shrink-0">
                    {editingId === cat.id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(cat.id)}
                          className="btn-gold text-xs py-1.5 px-3"
                        >
                          💾 सेव्ह
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-xs text-stone-500 hover:text-stone-700 px-2"
                        >
                          रद्द
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(cat.id)
                            setEditMarathi(cat.nameMarathi || '')
                            setEditName(cat.name)
                          }}
                          className="text-xs font-semibold bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          ✏️ संपादित करा
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, cat.nameMarathi || cat.name)}
                          className="text-xs font-semibold bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          🗑️ हटवा
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
