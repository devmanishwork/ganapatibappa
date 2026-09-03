'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface MurtiFormProps {
  initialData?: {
    id?: number
    name: string
    nameMarathi: string
    description: string
    size: string
    price: string
    imageUrl: string
    status: string
  }
  isEdit?: boolean
}

const SIZE_OPTIONS = [
  '4 इंच / 4 inch',
  '6 इंच / 6 inch',
  '8 इंच / 8 inch',
  '10 इंच / 10 inch',
  '1 फूट / 1 ft',
  '1.5 फूट / 1.5 ft',
  '2 फूट / 2 ft',
  '3 फूट / 3 ft',
  '4 फूट / 4 ft',
  'विशेष आकार / Custom',
]

export default function MurtiForm({ initialData, isEdit }: MurtiFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    name: initialData?.name || '',
    nameMarathi: initialData?.nameMarathi || '',
    description: initialData?.description || '',
    size: initialData?.size || SIZE_OPTIONS[1],
    price: initialData?.price || '',
    imageUrl: initialData?.imageUrl || '',
    status: initialData?.status || 'AVAILABLE',
  })

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(initialData?.imageUrl || '')

  const handleImageUpload = async (file: File) => {
    setUploading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Upload failed')
      }

      const data = await res.json()
      setForm((prev) => ({ ...prev, imageUrl: data.url }))
      setPreview(data.url)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Show local preview immediately
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)
      handleImageUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)
      handleImageUpload(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.imageUrl) {
      setError('कृपया फोटो अपलोड करा / Please upload a photo')
      return
    }

    setSaving(true)
    try {
      const url = isEdit ? `/api/murtis/${initialData?.id}` : '/api/murtis'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Save failed')
      }

      router.push('/admin')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          गणपतीचा फोटो * <span className="font-normal text-gray-400">(Photo)</span>
        </label>
        <div
          className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
            preview ? 'border-orange-300 bg-orange-50' : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50'
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {uploading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl z-10">
              <div className="flex items-center gap-2 text-orange-600">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                अपलोड होत आहे...
              </div>
            </div>
          )}

          {preview ? (
            <div className="relative w-48 h-48 mx-auto">
              <Image src={preview} alt="Preview" fill className="object-cover rounded-lg" />
            </div>
          ) : (
            <div className="py-8">
              <div className="text-4xl mb-2">📷</div>
              <p className="text-gray-500 text-sm">फोटो इथे ड्रॅग करा किंवा क्लिक करा</p>
              <p className="text-gray-400 text-xs mt-1">JPG, PNG, WEBP — max 5MB</p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {preview && (
          <button
            type="button"
            className="mt-2 text-sm text-orange-500 hover:underline"
            onClick={() => fileInputRef.current?.click()}
          >
            फोटो बदला / Change photo
          </button>
        )}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name (Marathi) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            मूर्तीचे नाव (मराठी) *
          </label>
          <input
            type="text"
            required
            placeholder="उदा. बाल गणेश"
            value={form.nameMarathi}
            onChange={(e) => setForm((p) => ({ ...p, nameMarathi: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Name (English) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Name (English) *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Bal Ganesh"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            आकार * <span className="font-normal text-gray-400">(Size)</span>
          </label>
          <select
            value={form.size}
            onChange={(e) => setForm((p) => ({ ...p, size: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          >
            {SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            किंमत (₹) * <span className="font-normal text-gray-400">(Price)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
            <input
              type="number"
              required
              min="1"
              placeholder="0"
              value={form.price}
              onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          वर्णन <span className="font-normal text-gray-400">(Description — optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="मूर्तीबद्दल थोडी माहिती लिहा..."
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          स्थिती * <span className="font-normal text-gray-400">(Status)</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="status"
              value="AVAILABLE"
              checked={form.status === 'AVAILABLE'}
              onChange={() => setForm((p) => ({ ...p, status: 'AVAILABLE' }))}
              className="accent-green-500 w-4 h-4"
            />
            <span className="badge-available">✓ उपलब्ध (Available)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="status"
              value="OUT_OF_STOCK"
              checked={form.status === 'OUT_OF_STOCK'}
              onChange={() => setForm((p) => ({ ...p, status: 'OUT_OF_STOCK' }))}
              className="accent-red-500 w-4 h-4"
            />
            <span className="badge-outofstock">✕ संपले (Out of Stock)</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className="btn-saffron flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'सेव्ह होत आहे...' : isEdit ? '✏️ अपडेट करा' : '➕ मूर्ती जोडा'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          रद्द करा
        </button>
      </div>
    </form>
  )
}
