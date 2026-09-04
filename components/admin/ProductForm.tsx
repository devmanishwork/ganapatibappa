'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { UploadCloud, CheckCircle2, Bookmark, XCircle, Star, Trash2, AlertCircle, Loader2 } from 'lucide-react'

interface Category {
  id: number
  name: string
  nameMarathi: string | null
}

interface Product {
  id: number
  productId: string
  nameMarathi: string | null
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

const PRESET_SIZES = [
  '4 इंच (4 Inch)',
  '6 इंच (6 Inch)',
  '8 इंच (8 Inch)',
  '9 इंच (9 Inch)',
  '10 इंच (10 Inch)',
  '1 फूट (1 Ft)',
  '1.25 फूट (1.25 Ft)',
  '1.5 फूट (1.5 Ft)',
  '1.75 फूट (1.75 Ft)',
  '2 फूट (2 Ft)',
  '2.5 फूट (2.5 Ft)',
  '3 फूट (3 Ft)',
  '3.5 फूट (3.5 Ft)',
  '4 फूट (4 Ft)',
  '4.5 फूट (4.5 Ft)',
  '5 फूट (5 Ft)',
  '6 फूट (6 Ft)',
  'विशेष आकार (Custom Size)',
]

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
  
  // Height dropdown state
  const initialHeight = initialData?.height ?? PRESET_SIZES[7]
  const isCustomHeightInitial = !PRESET_SIZES.includes(initialHeight)
  const [selectedSizeOption, setSelectedSizeOption] = useState(
    isCustomHeightInitial ? 'विशेष आकार (Custom Size)' : initialHeight
  )
  const [customHeight, setCustomHeight] = useState(isCustomHeightInitial ? initialHeight : '')

  const [categoryId, setCategoryId] = useState(initialData?.categoryId?.toString() ?? '')
  const [status, setStatus] = useState<'AVAILABLE' | 'BOOKED' | 'OUT_OF_STOCK'>(initialData?.status ?? 'AVAILABLE')
  const [featured, setFeatured] = useState(initialData?.featured ?? false)
  const [images, setImages] = useState<string[]>(initialData?.images ?? [])

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d)) setCategories(d)
      })
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
      Array.from(files).forEach(f => formData.append('file', f))
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      const urls: string[] = data.urls ?? (data.url ? [data.url] : [])
      setImages(prev => [...prev, ...urls])
    } catch {
      setError('फोटो अपलोड करताना अडचण आली. कृपया पुन्हा प्रयत्न करा.')
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

    const finalHeight = selectedSizeOption === 'विशेष आकार (Custom Size)'
      ? (customHeight.trim() || 'विशेष आकार')
      : selectedSizeOption

    const body = {
      productId: productId.trim(),
      nameMarathi: nameMarathi.trim(),
      name: nameEnglish.trim() || null,
      description: description.trim() || null,
      price: parseFloat(price),
      height: finalHeight,
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
    { value: 'AVAILABLE', label: 'उपलब्ध (Available)', icon: CheckCircle2, bg: 'bg-emerald-50', border: 'border-emerald-500', text: 'text-emerald-800' },
    { value: 'BOOKED', label: 'बुक केलेले (Booked)', icon: Bookmark, bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-800' },
    { value: 'OUT_OF_STOCK', label: 'संपले (Out of Stock)', icon: XCircle, bg: 'bg-rose-50', border: 'border-rose-500', text: 'text-rose-800' },
  ] as const

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-xl px-4 py-3 text-rose-800 text-sm font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Row 1: Product ID + Marathi Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="section-label block mb-1.5 text-stone-700">मूर्ती आयडी (Product ID) *</label>
          <input
            className="field font-mono"
            value={productId}
            onChange={e => setProductId(e.target.value)}
            placeholder="उदा. GNP-001"
            required
          />
        </div>
        <div>
          <label className="section-label block mb-1.5 text-stone-700">मराठी नाव *</label>
          <input
            className="field font-marathi font-semibold"
            value={nameMarathi}
            onChange={e => setNameMarathi(e.target.value)}
            placeholder="उदा. श्री सिद्धिविनायक बाप्पा"
            required
          />
        </div>
      </div>

      {/* Row 2: English Name + Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="section-label block mb-1.5 text-stone-700">English Name (Optional)</label>
          <input
            className="field"
            value={nameEnglish}
            onChange={e => setNameEnglish(e.target.value)}
            placeholder="e.g. Shree Siddhivinayak Bappa"
          />
        </div>
        <div>
          <label className="section-label block mb-1.5 text-stone-700">प्रकार (Category)</label>
          <select
            className="field font-marathi cursor-pointer"
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

      {/* Row 3: Height Dropdown & Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="section-label block mb-1.5 text-stone-700">आकार / उंची (Size / Height) *</label>
          <select
            className="field font-marathi cursor-pointer"
            value={selectedSizeOption}
            onChange={e => setSelectedSizeOption(e.target.value)}
            required
          >
            {PRESET_SIZES.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {selectedSizeOption === 'विशेष आकार (Custom Size)' && (
            <input
              type="text"
              className="field font-marathi mt-2"
              placeholder="उदा. 7.5 फूट किंवा विशेष डिझाईन"
              value={customHeight}
              onChange={e => setCustomHeight(e.target.value)}
              required
            />
          )}
        </div>

        <div>
          <label className="section-label block mb-1.5 text-stone-700">किंमत (Price ₹) *</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 font-bold">₹</span>
            <input
              type="number"
              min="0"
              className="field pl-8 font-semibold"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="5000"
              required
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="section-label block mb-1.5 text-stone-700">मूर्तीचे वर्णन (Description)</label>
        <textarea
          className="field font-marathi min-h-[85px] resize-y"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="मूर्तीचे वैशिष्ट्य, रंगकाम, सजावट इत्यादींची माहिती..."
          rows={3}
        />
      </div>

      {/* Status Radio Badges */}
      <div>
        <label className="section-label block mb-2 text-stone-700">उपलब्धता स्थिती (Availability Status) *</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {statusOptions.map(opt => {
            const Icon = opt.icon
            const isSelected = status === opt.value
            return (
              <label
                key={opt.value}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all font-semibold text-xs select-none ${
                  isSelected
                    ? `${opt.bg} ${opt.border} ${opt.text} shadow-sm ring-1 ring-offset-1`
                    : 'bg-white border-stone-200 text-stone-500 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value={opt.value}
                  checked={isSelected}
                  onChange={() => setStatus(opt.value)}
                  className="hidden"
                />
                <Icon className="w-4 h-4 shrink-0" />
                <span className="font-marathi">{opt.label}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Featured Checkbox */}
      <div className="bg-[var(--cream)]/60 border border-[var(--border)] rounded-xl p-3.5">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={featured}
            onChange={e => setFeatured(e.target.checked)}
            className="w-4 h-4 accent-[var(--gold)] rounded cursor-pointer"
          />
          <div className="flex items-center gap-1.5 text-sm font-bold font-marathi text-[var(--maroon)]">
            <Star className={`w-4 h-4 ${featured ? 'fill-amber-500 text-amber-500' : 'text-stone-400'}`} />
            <span>होमपेजवर प्रमुख मूर्ती म्हणून दाखवा (Featured)</span>
          </div>
        </label>
      </div>

      {/* Image Upload Area */}
      <div>
        <label className="section-label block mb-2 text-stone-700">मूर्तीचे फोटो (Product Photos)</label>
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-stone-300 hover:border-[var(--gold)] rounded-2xl p-7 text-center cursor-pointer transition-colors bg-stone-50 hover:bg-amber-50/40"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-stone-500">
              <Loader2 className="animate-spin h-7 w-7 text-[var(--gold)]" />
              <span className="text-xs font-semibold font-marathi text-[var(--maroon)]">फोटो अपलोड होत आहेत...</span>
            </div>
          ) : (
            <div className="text-stone-500 flex flex-col items-center">
              <UploadCloud className="w-9 h-9 text-[var(--gold)] mb-1.5" />
              <p className="font-semibold font-marathi text-sm text-stone-700">फोटो निवडण्यासाठी येथे क्लिक करा किंवा ड्रॅग करा</p>
              <p className="text-xs text-stone-400 mt-1">JPG, PNG, WEBP — एकापेक्षा जास्त फोटो निवडू शकता</p>
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

        {/* Uploaded Images Preview */}
        {images.length > 0 && (
          <div className="mt-3.5 grid grid-cols-4 sm:grid-cols-6 gap-2.5">
            {images.map((url, i) => (
              <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border-2 border-stone-200 bg-stone-100">
                <Image src={url} alt={`Image ${i + 1}`} width={90} height={90} className="object-cover w-full h-full" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-rose-700"
                  title="हटवा"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-3">
        <button
          type="submit"
          disabled={submitting}
          className="btn-gold flex-1 py-3 text-sm font-bold shadow-md disabled:opacity-60"
        >
          {submitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" />
              <span>जतन होत आहे...</span>
            </div>
          ) : isEdit ? (
            'बदल जतन करा (Save Changes)'
          ) : (
            'मूर्ती जोडा (Add Murti)'
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="btn-ghost-gold py-3 px-5 text-sm"
        >
          रद्द करा
        </button>
      </div>
    </form>
  )
}
