'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Ruler, MessageCircle, ArrowRight, ImageIcon } from 'lucide-react'
import StatusBadge from './StatusBadge'

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
  category?: { name: string; nameMarathi: string | null } | null
}

const WA1 = '9637153890'

export default function ProductCard({ product }: { product: Product }) {
  const images: string[] = (() => {
    try {
      return JSON.parse(product.images || '[]')
    } catch {
      return []
    }
  })()
  const mainImage = images[0] || null

  const isAvailable = product.status === 'AVAILABLE'
  const isBooked = product.status === 'BOOKED'

  const waMessage = encodeURIComponent(
    `नमस्कार श्री सिद्धिविनायक गणपती स्टॉल,\n\nमला खालील गणपती मूर्तीबद्दल माहिती हवी आहे:\n\nमूर्ती: ${product.nameMarathi || product.name}\nमूर्ती क्रमांक: ${product.productId}\nउंची: ${product.height}\nकिंमत: ₹${product.price.toLocaleString('en-IN')}\n\nकृपया उपलब्धता आणि बुकिंगची माहिती द्या.`
  )
  const waUrl = `https://wa.me/91${WA1}?text=${waMessage}`

  return (
    <article className="product-card group bg-white rounded-2xl overflow-hidden border-2 border-[var(--border)] shadow-sm hover:shadow-md transition-all flex flex-col">
      {/* ── Image Block ─────────────────────────── */}
      <Link href={`/products/${product.id}`} className="relative w-full aspect-[3/4] bg-[var(--cream-dark)] overflow-hidden block">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.nameMarathi || product.name}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              !isAvailable && !isBooked ? 'grayscale-[40%]' : ''
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 bg-[var(--cream)] gap-2">
            <ImageIcon className="w-10 h-10 text-[var(--gold)]/60" />
            <span className="font-marathi text-xs text-stone-500 font-semibold">श्री सिद्धिविनायक</span>
          </div>
        )}

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

        {/* Status badge — top left */}
        <div className="absolute top-3 left-3">
          <StatusBadge status={product.status} />
        </div>

        {/* Price badge — bottom left, over gradient */}
        <div className="absolute bottom-3 left-3">
          <span className="font-marathi inline-block bg-[var(--maroon)] text-[var(--gold-bright)] text-lg md:text-xl font-bold px-3 py-1 rounded-lg leading-tight shadow-md border border-[var(--gold)]/40">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>
      </Link>

      {/* ── Info Block ──────────────────────────── */}
      <div className="p-4 flex flex-col gap-2.5 flex-1 bg-white">
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold text-[var(--muted)] tracking-wider">
            <span>आयडी: <strong className="font-mono text-[var(--maroon)]">{product.productId}</strong></span>
            {product.category && (
              <span className="font-marathi text-[10px] text-[var(--burgundy)] bg-[var(--cream)] px-2 py-0.5 rounded-full border border-[var(--border)]">
                {product.category.nameMarathi || product.category.name}
              </span>
            )}
          </div>

          <Link href={`/products/${product.id}`}>
            <h3 className="font-marathi text-base md:text-lg font-bold leading-snug text-[var(--maroon)] line-clamp-1 hover:text-[var(--gold)] transition-colors mt-1">
              {product.nameMarathi || product.name}
            </h3>
          </Link>
          {product.nameMarathi && product.name && (
            <p className="text-[11px] text-stone-400 font-medium truncate">{product.name}</p>
          )}
        </div>

        {/* Size Chip */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-50/80 border border-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full">
            <Ruler className="w-3 h-3 text-amber-700" />
            <span>{product.height}</span>
          </span>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 font-marathi">
            {product.description}
          </p>
        )}

        {/* CTA Area */}
        <div className="mt-auto pt-2">
          {isAvailable ? (
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-xs py-2.5 w-full flex items-center justify-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>WhatsApp वर चौकशी</span>
            </a>
          ) : isBooked ? (
            <div className="w-full text-center py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold font-marathi">
              बुक केलेली मूर्ती
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <div className="w-full text-center py-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-500 text-xs font-bold font-marathi">
                सध्या उपलब्ध नाही
              </div>
              <Link href={`/products/${product.id}`} className="text-center text-[11px] font-bold text-[var(--maroon)] hover:text-[var(--gold)] flex items-center justify-center gap-1 transition-colors">
                <span>तपशील पाहा</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
