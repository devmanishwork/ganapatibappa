'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Ruler, MessageCircle, ArrowLeft, ArrowRight, ImageIcon, Layers, Tag } from 'lucide-react'
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
      <div className="text-[var(--maroon)] font-marathi text-base animate-pulse">लोड होत आहे...</div>
    </div>
  )

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--cream)] gap-4 p-4 text-center">
      <ImageIcon className="w-12 h-12 text-[var(--gold)]" />
      <h2 className="font-marathi text-2xl font-bold text-[var(--maroon)]">मूर्ती सापडली नाही</h2>
      <Link href="/#catalog" className="btn-gold text-xs">
        मूर्ती संग्रह पाहा
      </Link>
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
        <div className="section-wrapper py-3 flex items-center gap-2 text-xs text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--maroon)]">मुख्यपृष्ठ</Link>
          <span>/</span>
          <Link href="/#catalog" className="hover:text-[var(--maroon)]">गणपती मूर्ती</Link>
          <span>/</span>
          <span className="font-marathi text-[var(--maroon)] font-semibold truncate">{product.nameMarathi || product.name}</span>
        </div>
      </div>

      <div className="section-wrapper py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

          {/* ── Image Gallery ─── */}
          <div>
            {/* Main image */}
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-white border-2 border-[var(--border)] shadow-md">
              {hasImages ? (
                <Image
                  src={images[selectedImg]}
                  alt={product.nameMarathi || product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 bg-[var(--cream)] gap-2">
                  <ImageIcon className="w-12 h-12 text-[var(--gold)]/60" />
                  <span className="font-marathi text-xs">श्री सिद्धिविनायक गणपती स्टॉल</span>
                </div>
              )}
              {/* Status badge top-left */}
              <div className="absolute top-3 left-3">
                <StatusBadge status={product.status} />
              </div>
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-3 mt-3.5 overflow-x-auto pb-1">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImg === i ? 'border-[var(--gold)] ring-2 ring-[var(--gold)]/40' : 'border-stone-200'}`}
                  >
                    <Image src={img} alt="" width={80} height={80} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ─── */}
          <div className="flex flex-col gap-4">
            {/* Product ID */}
            <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] font-semibold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>मूर्ती क्रमांक:</span>
              <strong className="font-mono text-[var(--maroon)]">{product.productId}</strong>
            </div>

            {/* Name */}
            <div>
              <h1 className="font-marathi text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--maroon)] leading-tight">
                {product.nameMarathi || product.name}
              </h1>
              {product.nameMarathi && product.name && (
                <p className="text-stone-400 text-sm mt-1">{product.name}</p>
              )}
            </div>

            {/* Price */}
            <div className="bg-[var(--maroon)] text-[var(--gold-bright)] rounded-2xl px-6 py-3.5 inline-block w-fit border border-[var(--gold)]/30 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-widest opacity-80 mb-0.5">किंमत</p>
              <p className="text-3xl font-black">₹{product.price?.toLocaleString('en-IN')}</p>
            </div>

            {/* Details chips */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <div className="flex items-center gap-1.5 bg-white border border-[var(--border)] rounded-full px-3.5 py-1.5 shadow-xs">
                <Ruler className="w-3.5 h-3.5 text-amber-700" />
                <span className="font-marathi font-semibold text-xs text-[var(--maroon)]">उंची: {product.height}</span>
              </div>
              <StatusBadge status={product.status} />
              {product.category && (
                <div className="flex items-center gap-1.5 bg-[var(--cream-dark)] border border-[var(--border)] rounded-full px-3.5 py-1.5">
                  <Layers className="w-3.5 h-3.5 text-[var(--burgundy)]" />
                  <span className="font-marathi text-xs font-bold text-[var(--burgundy)]">{product.category.nameMarathi || product.category.name}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="bg-white rounded-2xl p-5 border border-stone-200">
                <p className="font-bold text-[var(--maroon)] text-xs uppercase tracking-wider mb-1.5">वर्णन व वैशिष्ट्ये</p>
                <p className="font-marathi text-stone-700 text-xs md:text-sm leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* CTA area */}
            <div className="flex flex-col gap-2.5 pt-2">
              {product.status === 'AVAILABLE' ? (
                <>
                  <a
                    href={`https://wa.me/${WA1}?text=${waMessage}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-whatsapp text-sm py-3.5 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>या मूर्तीबद्दल WhatsApp वर विचारा (9637153890)</span>
                  </a>
                  <a
                    href={`https://wa.me/${WA2}?text=${waMessage}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-ghost-gold text-xs py-3 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>दुसऱ्या नंबरवर विचारा — 8766048648</span>
                  </a>
                </>
              ) : product.status === 'BOOKED' ? (
                <div className="bg-amber-50 border border-amber-300 text-amber-800 rounded-xl p-4 text-center font-marathi font-bold text-sm">
                  ही मूर्ती बुक केलेली आहे
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-4 text-center font-marathi font-bold text-sm">
                    ही मूर्ती सध्या उपलब्ध नाही
                  </div>
                  <Link href="/#catalog" className="btn-gold text-center text-xs py-3 flex items-center justify-center gap-1.5">
                    <span>इतर उपलब्ध मूर्ती पाहा</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Back link */}
            <button onClick={() => router.back()} className="text-[var(--muted)] text-xs hover:text-[var(--maroon)] transition-colors text-left mt-2 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>मागे जा</span>
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
