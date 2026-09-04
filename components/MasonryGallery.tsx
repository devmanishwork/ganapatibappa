'use client'

import { useState } from 'react'
import Image from 'next/image'

interface GalleryItem {
  id: number
  url: string
  caption?: string | null
}

export default function MasonryGallery({ images }: { images: GalleryItem[] }) {
  const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null)

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-[var(--border)] max-w-md mx-auto p-6">
        <span className="text-4xl">📷</span>
        <p className="font-marathi font-bold text-[var(--maroon)] mt-3">गॅलरी लवकरच उपलब्ध होईल</p>
        <p className="font-marathi text-xs text-[var(--muted)] mt-1">स्टॉलवरील नवीन फोटोंसाठी लवकरच भेट द्या.</p>
      </div>
    )
  }

  return (
    <div>
      {/* ── Masonry Grid ── */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map(img => (
          <div
            key={img.id}
            onClick={() => setSelectedImg(img)}
            className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group border-2 border-[var(--border)] bg-white shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
          >
            <div className="relative w-full aspect-square sm:aspect-auto">
              <img
                src={img.url}
                alt={img.caption || 'गणपती मूर्ती'}
                className="w-full h-auto object-cover block"
                loading="lazy"
              />
            </div>
            {img.caption && (
              <div className="p-2 bg-white text-center">
                <p className="font-marathi text-xs font-semibold text-[var(--maroon)] truncate">
                  {img.caption}
                </p>
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-2xl">🔍</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Lightbox Modal ── */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImg(null)}
        >
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-5 right-5 text-white text-3xl font-bold bg-white/20 hover:bg-white/40 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
          >
            ✕
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={selectedImg.url}
              alt={selectedImg.caption || 'गणपती मूर्ती'}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border-2 border-[var(--gold)]"
            />
            {selectedImg.caption && (
              <p className="font-marathi text-white text-center text-sm font-semibold mt-3 bg-black/60 px-4 py-2 rounded-full">
                {selectedImg.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
