'use client'

import Image from 'next/image'
import Link from 'next/link'
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
    <article className="product-card group">
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
          <div className="w-full h-full flex items-center justify-center text-5xl bg-[var(--cream)]">🪔</div>
        )}

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Status badge — top left */}
        <div className="absolute top-3 left-3">
          <StatusBadge status={product.status} />
        </div>

        {/* Price — bottom left, over gradient */}
        <div className="absolute bottom-3 left-3">
          <span className="font-marathi inline-block bg-[var(--maroon)] text-[var(--gold-bright)] text-xl font-bold px-3 py-1 rounded-lg leading-tight shadow-md border border-[var(--gold)]/40">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>
      </Link>

      {/* ── Info Block ──────────────────────────── */}
      <div className="p-4 flex flex-col gap-2.5 flex-1 bg-white">
        <div>
          <span className="text-[11px] font-bold text-[var(--muted)] tracking-wider">
            मूर्ती क्रमांक: <strong className="text-[var(--maroon)]">{product.productId}</strong>
          </span>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-marathi text-lg font-bold leading-snug text-[var(--maroon)] line-clamp-1 hover:text-[var(--gold)] transition-colors mt-0.5">
              {product.nameMarathi || product.name}
            </h3>
          </Link>
          {product.nameMarathi && (
            <p className="text-xs text-stone-400 font-medium">{product.name}</p>
          )}
        </div>

        {/* Size & Category chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full">
            📐 {product.height}
          </span>
          {product.category && (
            <span className="inline-flex items-center text-[11px] font-semibold bg-[var(--cream)] border border-[var(--border)] text-[var(--burgundy)] px-2 py-0.5 rounded-full">
              {product.category.nameMarathi || product.category.name}
            </span>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

        {/* CTA Area */}
        <div className="mt-auto pt-2">
          {isAvailable ? (
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-xs py-2.5 w-full">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp वर चौकशी
            </a>
          ) : isBooked ? (
            <div className="w-full text-center py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
              🟡 बुक केलेली मूर्ती
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <div className="w-full text-center py-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-400 text-xs font-bold">
                🔴 सध्या उपलब्ध नाही
              </div>
              <Link href={`/products/${product.id}`} className="text-center text-[11px] font-bold text-[var(--gold)] hover:underline">
                इतर तपशील पाहा →
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
