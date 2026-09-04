'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Category {
  id: number
  name: string
  nameMarathi: string | null
}

interface Product {
  id: number
  productId: string
  nameMarathi: string
  name: string | null
  description: string | null
  price: number
  height: string
  categoryId: number | null
  status: 'AVAILABLE' | 'BOOKED' | 'OUT_OF_STOCK'
  featured: boolean
  images: string[]
}

interface Props {
  isEdit: boolean
  initialData?: Product
}

export default function ProductForm({ isEdit, initialData }: Props) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [categories, setCategories] = useState<Category[]>([])
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [productId, setProductId] = useState(initialData?.productId ?? '')
  const [nameMarathi, setNameMarathi] = useState(initialData?.nameMarathi ?? '')
  const [nameEnglish, setNameEnglish] = useState(initialData?.name ?? '')
  const [description, setDescription] = useState(initialData?.description ?? '')
  const [price, setPrice] = useState(initialData?.price?.toString() ?? '')
  const [height, setHeight] = useState(initialData?.height ?? '')
  const [categoryId, setCategoryId] = useState(initialData?.categoryId?.toString() ?? '')
  const [status, setStatus] = useState<'AVAILABLE' | 'BOOKED' | 'OUT_OF_STOCK'>(initialData?.status ?? 'AVAILABLE')
  const [featured, setFeatured] = useState(initialData?.featured ?? false)
  const [images, setImages] = useState<string[]>(initialData?.images ?? [])

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(setCategories)
      .catch(() => {})
  }, [])

  // Auto-generate productId suggestion
  useEffect(() => {
    if (!isEdit && !productId && nameMarathi) {
      const suffix = Date.now().toString().slice(-4)
      setProductId(`GNP-${suffix}`)
    }
  }, [nameMarathi, isEdit, productId])

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)
    setError('')
    try {
      const formData = new FormData()
      Array.from(files).forEach(f => formData.append('files', f))
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      const urls: string[] = data.urls ?? (data.url ? [data.url] : [])
      setImages(prev => [...prev, ...urls])
    } catch {
      setError('फोटो अपलोड करताना चूक झाली.')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFileUpload(e.dataTransfer.files)
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const body = {
      productId,
      nameMarathi,
      name: nameEnglish || null,
      description: description || null,
      price: parseFloat(price),
      height,
      categoryId: categoryId ? parseInt(categoryId) : null,
      status,
      featured,
      images,
    }
    try {
      const url = isEdit ? `/api/products/${initialData!.id}` : '/api/products'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error || 'सेव्ह करताना चूक झाली.')
      }
      router.push('/admin/products')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'अज्ञात चूक झाली.')
    } finally {
      setSubmitting(false)
    }
  }

  const statusOptions = [
    { value: 'AVAILABLE',    label: 'उपलब्ध',    emoji: '✅', bg: 'bg-green-50',  border: 'border-green-400',  text: 'text-green-800'  },
    { value: 'BOOKED',       label: 'बुक केले',  emoji: '🔖', bg: 'bg-amber-50',  border: 'border-amber-400',  text: 'text-amber-800'  },
    { value: 'OUT_OF_STOCK', label: 'संपले',     emoji: '❌', bg: 'bg-red-50',    border: 'border-red-400',    text: 'text-red-800'    },
  ] as const

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

      {error && (
        <div className="bg-red-50 border-2 border-red-300 rounded-xl px-4 py-3 text-red-700 text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* Row 1: Product ID + Marathi Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="section-label block mb-1.5">Product ID *</label>
          <input
            className="field"
            value={productId}
            onChange={e => setProductId(e.target.value)}
            placeholder="GNP-001"
            required
          />
        </div>
        <div>
          <label className="section-label block mb-1.5">मराठी नाव *</label>
          <input
            className="field font-marathi"
            value={nameMarathi}
            onChange={e => setNameMarathi(e.target.value)}
            placeholder="श्री सिद्धिविनायक गणपती"
            required
          />
        </div>
      </div>

      {/* Row 2: English Name + Height */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="section-label block mb-1.5">English Name</label>
          <input
            className="field"
            value={nameEnglish}
            onChange={e => setNameEnglish(e.target.value)}
            placeholder="Shri Siddhivinayak Ganpati"
          />
        </div>
        <div>
          <label className="section-label block mb-1.5">उंची *</label>
          <input
            className="field"
            value={height}
            onChange={e => setHeight(e.target.value)}
            placeholder="3.5 फूट"
            required
          />
        </div>
      </div>

      {/* Row 3: Price + Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="section-label block mb-1.5">किंमत (₹) *</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 font-bold">₹</span>
            <input
              type="number"
              min="0"
              className="field pl-7"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="5000"
              required
            />
          </div>
        </div>
        <div>
          <label className="section-label block mb-1.5">प्रकार</label>
          <select
            className="field"
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
          >
            <option value="">-- प्रकार निवडा --</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.nameMarathi || c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="section-label block mb-1.5">वर्णन</label>
        <textarea
          className="field min-h-[80px] resize-y"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="मूर्तीबद्दल अधिक माहिती..."
          rows={3}
        />
      </div>

      {/* Status */}
      <div>
        <label className="section-label block mb-2">स्थिती *</label>
        <div className="flex flex-wrap gap-3">
          {statusOptions.map(opt => (
            <label
              key={opt.value}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all font-semibold text-sm ${
                status === opt.value
                  ? `${opt.bg} ${opt.border} ${opt.text} shadow-md`
                  : 'bg-white border-stone-200 text-stone-500 hover:border-stone-300'
              }`}
            >
              <input
                type="radio"
                name="status"
                value={opt.value}
                checked={status === opt.value}
                onChange={() => setStatus(opt.value)}
                className="hidden"
              />
              {opt.emoji} {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Featured */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer select-none w-fit">
          <input
            type="checkbox"
            checked={featured}
            onChange={e => setFeatured(e.target.checked)}
            className="w-5 h-5 accent-[var(--gold)] rounded"
          />
          <span className="font-semibold text-stone-700">⭐ होमपेजवर दाखवा</span>
        </label>
      </div>

      {/* Image upload */}
      <div>
        <label className="section-label block mb-2">फोटो</label>
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-stone-300 rounded-xl p-6 text-center cursor-pointer hover:border-[var(--gold)] transition-colors bg-stone-50 hover:bg-[var(--gold-light)]/30"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-stone-500">
              <svg className="animate-spin h-8 w-8 text-[var(--gold)]" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm font-medium">अपलोड होत आहे...</span>
            </div>
          ) : (
            <div className="text-stone-500">
              <div className="text-3xl mb-2">📸</div>
              <p className="font-semibold text-sm">फोटो येथे ड्रॅग करा किंवा क्लिक करा</p>
              <p className="text-xs text-stone-400 mt-1">JPG, PNG, WEBP — अनेक फोटो एकत्र निवडा</p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={e => handleFileUpload(e.target.files)}
        />

        {/* Image preview grid */}
        {images.length > 0 && (
          <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
            {images.map((url, i) => (
              <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border-2 border-stone-200">
                <Image src={url} alt={`Image ${i + 1}`} width={80} height={80} className="object-cover w-full h-full" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="btn-gold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              जतन होत आहे...
            </>
          ) : isEdit ? (
            '💾 बदल जतन करा'
          ) : (
            '✅ मूर्ती जोडा'
          )}
        </button>
      </div>
    </form>
  )
}
