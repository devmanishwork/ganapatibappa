'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// ⚠️ Must be defined OUTSIDE MurtiForm — if defined inside, React
// creates a new component type on every state change → inputs unmount
// on each keystroke → cursor is lost. Moving it here fixes that.
function Field({
  label, sub, children,
}: {
  label: string
  sub?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
        {label}
        {sub && (
          <span className="normal-case font-normal tracking-normal text-stone-400 ml-1">
            ({sub})
          </span>
        )}
      </label>
      {children}
    </div>
  )
}

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
  '4 इंच / 4 inch', '6 इंच / 6 inch', '8 इंच / 8 inch', '10 इंच / 10 inch',
  '1 फूट / 1 ft', '1.5 फूट / 1.5 ft', '2 फूट / 2 ft', '3 फूट / 3 ft',
  '4 फूट / 4 ft', 'विशेष आकार / Custom',
]

export default function MurtiForm({ initialData, isEdit }: MurtiFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    name:        initialData?.name        || '',
    nameMarathi: initialData?.nameMarathi || '',
    description: initialData?.description || '',
    size:        initialData?.size        || SIZE_OPTIONS[1],
    price:       initialData?.price       || '',
    imageUrl:    initialData?.imageUrl    || '',
    status:      initialData?.status      || 'AVAILABLE',
  })

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving]       = useState(false)
  const [error, setError]         = useState('')
  const [preview, setPreview]     = useState(initialData?.imageUrl || '')

  const uploadFile = async (file: File) => {
    setUploading(true); setError('')
    try {
      const fd = new FormData(); fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error) }
      const d = await res.json()
      setForm(p => ({ ...p, imageUrl: d.url }))
      setPreview(d.url)
    } catch (err: any) { setError(err.message) }
    finally { setUploading(false) }
  }

  const handleFile = (file: File) => {
    setPreview(URL.createObjectURL(file))
    uploadFile(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (!form.imageUrl) { setError('कृपया फोटो अपलोड करा'); return }
    setSaving(true)
    try {
      const res = await fetch(
        isEdit ? `/api/murtis/${initialData?.id}` : '/api/murtis',
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
        }
      )
      if (!res.ok) { const d = await res.json(); throw new Error(d.error) }
      router.push('/admin'); router.refresh()
    } catch (err: any) { setError(err.message) }
    finally { setSaving(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border-2 border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          <span>⚠️</span> {error}
        </div>
      )}

      {/* ── Photo Upload ─────────────────────── */}
      <div>
        <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
          गणपतीचा फोटो <span className="text-orange-500">*</span>
        </label>
        <div
          className={`relative border-2 border-dashed rounded-2xl overflow-hidden cursor-pointer transition-colors ${
            preview
              ? 'border-orange-400'
              : 'border-stone-300 hover:border-orange-400 bg-stone-50 hover:bg-orange-50'
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f) }}
          onDragOver={e => e.preventDefault()}
        >
          {uploading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 gap-2">
              <svg className="animate-spin h-8 w-8 text-orange-500" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <span className="text-sm font-semibold text-orange-600">अपलोड होत आहे...</span>
            </div>
          )}

          {preview ? (
            <div className="relative w-full h-64">
              <Image src={preview} alt="Preview" fill className="object-contain" />
              <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 hover:opacity-100 transition-opacity">
                <span className="bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  📷 फोटो बदला
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-14 gap-3">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 border-2 border-orange-200 flex items-center justify-center text-2xl">📷</div>
              <div className="text-center">
                <p className="font-semibold text-stone-600 text-sm">फोटो इथे ड्रॅग करा किंवा क्लिक करा</p>
                <p className="text-stone-400 text-xs mt-0.5">JPG, PNG, WEBP — जास्तीत जास्त 5MB</p>
              </div>
            </div>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
      </div>

      {/* ── Names ────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="मूर्तीचे नाव" sub="मराठी">
          <input type="text" required placeholder="उदा. बाल गणेश"
            value={form.nameMarathi}
            onChange={e => setForm(p => ({ ...p, nameMarathi: e.target.value }))}
            className="field font-marathi" />
        </Field>
        <Field label="Name" sub="English">
          <input type="text" required placeholder="e.g. Bal Ganesh"
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            className="field" />
        </Field>
      </div>

      {/* ── Size & Price ─────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="आकार" sub="Size">
          <select value={form.size}
            onChange={e => setForm(p => ({ ...p, size: e.target.value }))}
            className="field bg-white">
            {SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="किंमत" sub="Price ₹">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-stone-400">₹</span>
            <input type="number" required min="1" placeholder="0"
              value={form.price}
              onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
              className="field pl-8" />
          </div>
        </Field>
      </div>

      {/* ── Description ──────────────────────── */}
      <Field label="वर्णन" sub="Description — optional">
        <textarea rows={3} placeholder="मूर्तीबद्दल थोडी माहिती..."
          value={form.description}
          onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
          className="field resize-none" />
      </Field>

      {/* ── Status ───────────────────────────── */}
      <div>
        <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
          स्थिती / Status
        </label>
        <div className="flex gap-3">
          {[
            { value: 'AVAILABLE',    label: '✓ उपलब्ध',   desc: 'Available', ring: 'border-emerald-500 bg-emerald-50 text-emerald-700' },
            { value: 'OUT_OF_STOCK', label: '✕ संपले',    desc: 'Out of Stock', ring: 'border-stone-400 bg-stone-50 text-stone-600' },
          ].map(opt => (
            <label key={opt.value} className="flex-1 cursor-pointer">
              <input type="radio" name="status" value={opt.value}
                checked={form.status === opt.value}
                onChange={() => setForm(p => ({ ...p, status: opt.value }))}
                className="sr-only" />
              <div className={`border-2 rounded-xl p-3 text-center transition-all ${
                form.status === opt.value ? opt.ring + ' shadow-[3px_3px_0px_rgba(0,0,0,0.1)]' : 'border-stone-200 bg-white text-stone-400'
              }`}>
                <div className="font-marathi font-bold text-sm">{opt.label}</div>
                <div className="text-xs opacity-70 mt-0.5">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* ── Actions ──────────────────────────── */}
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving || uploading}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[4px_4px_0px_#7C2D00]">
          {saving
            ? <><span className="animate-spin">⏳</span> सेव्ह होत आहे...</>
            : isEdit ? '✏️ अपडेट करा' : '➕ मूर्ती जोडा'}
        </button>
        <button type="button" onClick={() => router.push('/admin')}
          className="btn-ghost">
          रद्द करा
        </button>
      </div>

    </form>
  )
}
