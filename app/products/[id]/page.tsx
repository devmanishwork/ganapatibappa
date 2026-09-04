'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWhatsApp, { StickyMobileBar } from '@/components/FloatingWhatsApp'
import StatusBadge from '@/components/StatusBadge'

const WA1 = '919637153890'
const WA2 = '918766048648'

export default function ProductDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImg, setSelectedImg] = useState(0)

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { setProduct(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--cream)]">
      <div className="text-[var(--maroon)] font-marathi text-xl animate-pulse">लोड होत आहे...</div>
    </div>
  )

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--cream)] gap-4">
      <div className="text-5xl">🪔</div>
      <h2 className="font-marathi text-2xl font-bold text-[var(--maroon)]">मूर्ती सापडली नाही</h2>
      <Link href="/#catalog" className="btn-gold">← मागे जा</Link>
    </div>
  )

  const images: string[] = (() => { try { return JSON.parse(product.images || '[]') } catch { return [] } })()
  const hasImages = images.length > 0

  const waMessage = encodeURIComponent(
    `नमस्कार श्री सिद्धिविनायक गणपती स्टॉल,\n\nमला खालील गणपती मूर्तीबद्दल माहिती हवी आहे:\n\nमूर्ती: ${product.nameMarathi || product.name}\nमूर्ती क्रमांक: ${product.productId}\nउंची: ${product.height}\nकिंमत: ₹${product.price?.toLocaleString('en-IN')}\n\nकृपया उपलब्धता आणि बुकिंगची माहिती द्या.`
  )

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[var(--border)]">
        <div className="section-wrapper py-3 flex items-center gap-2 text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--maroon)]">मुख्यपृष्ठ</Link>
          <span>/</span>
          <Link href="/#catalog" className="hover:text-[var(--maroon)]">गणपती मूर्ती</Link>
          <span>/</span>
          <span className="font-marathi text-[var(--maroon)] font-semibold">{product.nameMarathi || product.name}</span>
        </div>
      </div>

      <div className="section-wrapper py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── Image Gallery ─── */}
          <div>
            {/* Main image */}
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-white border-2 border-[var(--border)] shadow-[6px_6px_0px_var(--gold)]">
              {hasImages ? (
                <Image
                  src={images[selectedImg]}
                  alt={product.nameMarathi || product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl bg-[var(--cream)]">🪔</div>
              )}
              {/* Status badge top-left */}
              <div className="absolute top-3 left-3">
                <StatusBadge status={product.status} />
              </div>
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImg === i ? 'border-[var(--gold)] shadow-[2px_2px_0px_var(--maroon)]' : 'border-[var(--border)]'}`}
                  >
                    <Image src={img} alt="" width={80} height={80} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ─── */}
          <div className="flex flex-col gap-5">
            {/* Product ID */}
            <p className="text-xs text-[var(--muted)] font-semibold uppercase tracking-widest">
              मूर्ती क्रमांक: <span className="text-[var(--maroon)]">{product.productId}</span>
            </p>

            {/* Name */}
            <div>
              <h1 className="font-marathi text-3xl md:text-4xl font-bold text-[var(--maroon)] leading-tight">
                {product.nameMarathi || product.name}
              </h1>
              {product.nameMarathi && (
                <p className="text-[var(--muted)] text-base mt-1">{product.name}</p>
              )}
            </div>

            {/* Price */}
            <div className="bg-[var(--maroon)] text-[var(--gold-bright)] rounded-2xl px-6 py-4 inline-block w-fit">
              <p className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-1">किंमत</p>
              <p className="text-4xl font-black">₹{product.price?.toLocaleString('en-IN')}</p>
            </div>

            {/* Details chips */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white border-2 border-[var(--border)] rounded-full px-4 py-2">
                <span>📐</span>
                <span className="font-marathi font-semibold text-sm text-[var(--maroon)]">उंची: {product.height}</span>
              </div>
              <StatusBadge status={product.status} />
              {product.category && (
                <div className="flex items-center gap-2 bg-[var(--gold-light)] border-2 border-[var(--gold)] rounded-full px-4 py-2">
                  <span className="font-marathi text-xs font-bold text-[var(--burgundy)]">{product.category.nameMarathi || product.category.name}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="bg-white rounded-2xl p-5 border-2 border-[var(--border)]">
                <p className="font-semibold text-[var(--maroon)] mb-2">वर्णन</p>
                <p className="font-marathi text-[var(--muted)] leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* CTA area */}
            <div className="flex flex-col gap-3 pt-2">
              {product.status === 'AVAILABLE' ? (
                <>
                  <a
                    href={`https://wa.me/${WA1}?text=${waMessage}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-whatsapp text-base py-4"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    📱 या मूर्तीबद्दल WhatsApp वर विचारा
                  </a>
                  <a
                    href={`https://wa.me/${WA2}?text=${waMessage}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-ghost-gold text-sm py-3"
                  >
                    दुसऱ्या नंबरवर विचारा — 8766048648
                  </a>
                </>
              ) : product.status === 'BOOKED' ? (
                <div className="bg-amber-50 border-2 border-amber-300 text-amber-800 rounded-xl p-4 text-center font-marathi font-bold">
                  🟡 ही मूर्ती बुक केलेली आहे
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="bg-red-50 border-2 border-red-200 text-red-800 rounded-xl p-4 text-center font-marathi font-bold">
                    🔴 ही मूर्ती सध्या उपलब्ध नाही
                  </div>
                  <Link href="/#catalog" className="btn-gold text-center">
                    इतर मूर्ती पाहा →
                  </Link>
                </div>
              )}
            </div>

            {/* Back link */}
            <button onClick={() => router.back()} className="text-[var(--muted)] text-sm hover:text-[var(--maroon)] transition-colors text-left mt-2">
              ← परत जा
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
      <StickyMobileBar />
    </div>
  )
}
