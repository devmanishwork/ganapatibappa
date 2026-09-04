'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { UploadCloud, Trash2, Loader2, Image as ImageIcon } from 'lucide-react'
import AdminSidebar from '@/components/AdminSidebar'

interface GalleryItem {
  id: number
  url: string
  caption: string | null
}

export default function GalleryAdminPage() {
  const [images, setImages] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchGallery = async () => {
    setLoading(true)
    const res = await fetch('/api/gallery')
    if (res.ok) setImages(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchGallery() }, [])

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      Array.from(files).forEach(f => formData.append('file', f))

      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('फोटो अपलोड अयशस्वी')
      const data = await res.json()
      const urls: string[] = data.urls ?? (data.url ? [data.url] : [])

      for (const url of urls) {
        await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, caption: caption.trim() || null }),
        })
      }

      setCaption('')
      fetchGallery()
    } catch (err: any) {
      setError(err.message || 'काहीतरी चूक झाली.')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('हा फोटो गॅलरीतून हटवायचा आहे का?')) return
    const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
    if (res.ok) setImages(prev => prev.filter(img => img.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-[var(--cream)]">
      <AdminSidebar activeSection="gallery" />

      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        <div className="mb-6">
          <h1 className="font-marathi text-2xl font-bold text-[var(--maroon)]">
            गॅलरी व्यवस्थापन (Gallery)
          </h1>
          <p className="font-marathi text-xs text-[var(--muted)] mt-1">
            स्टॉलचे आणि सुंदर मूर्तींचे फोटो गॅलरीमध्ये जोडा जेणेकरून ग्राहक होमपेजवर पाहू शकतील.
          </p>
        </div>

        {/* Upload Box */}
        <div className="bg-white p-6 rounded-2xl border-2 border-stone-200 shadow-sm mb-6">
          <h2 className="font-marathi font-bold text-[var(--maroon)] text-sm mb-3">
            नवीन फोटो गॅलरीमध्ये जोडा
          </h2>

          {error && (
            <div className="bg-rose-50 border border-rose-300 text-rose-700 text-xs p-3 rounded-xl mb-4 font-semibold">
              {error}
            </div>
          )}

          <div className="space-y-3.5">
            <div>
              <label className="section-label block mb-1 text-stone-700">फोटोचे शीर्षक / माहिती (ऐच्छिक)</label>
              <input
                type="text"
                placeholder="उदा. श्री सिद्धिविनायक आगमन सोहळा"
                value={caption}
                onChange={e => setCaption(e.target.value)}
                className="field font-marathi text-xs"
              />
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-stone-300 hover:border-[var(--gold)] rounded-2xl p-7 text-center cursor-pointer bg-stone-50 hover:bg-amber-50/40 transition-colors"
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="animate-spin w-7 h-7 text-[var(--gold)]" />
                  <span className="font-marathi text-xs font-semibold text-[var(--maroon)]">फोटो अपलोड होत आहेत...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <UploadCloud className="w-9 h-9 text-[var(--gold)] mb-1" />
                  <p className="font-marathi font-bold text-stone-700 text-sm">फोटो निवडण्यासाठी येथे क्लिक करा किंवा ड्रॅग करा</p>
                  <p className="text-xs text-stone-400 mt-1">एक किंवा अनेक फोटो निवडा (JPG, PNG, WEBP)</p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={e => handleUpload(e.target.files)}
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="bg-white p-6 rounded-2xl border-2 border-stone-200 shadow-sm">
          <h2 className="font-marathi font-bold text-[var(--maroon)] text-sm mb-4">
            गॅलरीतील सर्व फोटो ({images.length})
          </h2>

          {loading ? (
            <div className="py-12 text-center text-stone-400 font-marathi flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" />
              <span>लोड होत आहे...</span>
            </div>
          ) : images.length === 0 ? (
            <div className="py-12 text-center text-stone-400 font-marathi text-xs">
              गॅलरीमध्ये अद्याप कोणतेही फोटो नाहीत.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {images.map(img => (
                <div key={img.id} className="group relative rounded-xl overflow-hidden border border-stone-200 bg-stone-50 shadow-xs">
                  <div className="relative aspect-square w-full">
                    <Image src={img.url} alt={img.caption || ''} fill className="object-cover" />
                  </div>

                  {img.caption && (
                    <div className="p-2 bg-white text-[11px] font-marathi truncate text-stone-700">
                      {img.caption}
                    </div>
                  )}

                  <button
                    onClick={() => handleDelete(img.id)}
                    className="absolute top-2 right-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    title="हटवा"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
