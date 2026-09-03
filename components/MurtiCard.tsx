'use client'

import Image from 'next/image'

interface Murti {
  id: number
  name: string
  nameMarathi: string | null
  description: string | null
  size: string
  price: number
  imageUrl: string
  status: string
}

const WHATSAPP_NUMBER = '9637153890'

export default function MurtiCard({ murti }: { murti: Murti }) {
  const isAvailable = murti.status === 'AVAILABLE'

  const whatsappMessage = encodeURIComponent(
    `🙏 नमस्कार!\n\nमला "${murti.nameMarathi || murti.name}" (${murti.size}) या गणपती मूर्तीबद्दल माहिती हवी आहे.\n\nकिंमत: ₹${murti.price.toLocaleString('en-IN')}\n\nHello! I'm interested in "${murti.name}" – Size: ${murti.size} – ₹${murti.price.toLocaleString('en-IN')}`
  )
  const waUrl = `https://wa.me/91${WHATSAPP_NUMBER}?text=${whatsappMessage}`

  return (
    <article className="murti-card group">

      {/* ── Image block ─────────────────────────── */}
      <div className="relative w-full aspect-[4/5] bg-stone-100 overflow-hidden">
        <Image
          src={murti.imageUrl}
          alt={murti.nameMarathi || murti.name}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
            !isAvailable ? 'grayscale-[40%]' : ''
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Status badge — top left */}
        <div className="absolute top-3 left-3">
          {isAvailable
            ? <span className="badge-available">● उपलब्ध</span>
            : <span className="badge-sold">✕ संपले</span>}
        </div>

        {/* Price — bottom left, over gradient */}
        <div className="absolute bottom-3 left-3">
          <span className="font-marathi inline-block bg-[#F4600C] text-white text-xl font-bold px-3 py-1 rounded-lg leading-tight shadow-lg">
            ₹{murti.price.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* ── Info block ──────────────────────────── */}
      <div className="p-4 flex flex-col gap-3 flex-1">

        {/* Name */}
        <div>
          <h3 className="font-marathi text-lg font-bold leading-snug text-stone-900 line-clamp-1">
            {murti.nameMarathi || murti.name}
          </h3>
          {murti.nameMarathi && (
            <p className="text-xs text-stone-400 font-medium mt-0.5">{murti.name}</p>
          )}
        </div>

        {/* Size chip */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-800 px-2.5 py-1 rounded-full">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
            </svg>
            {murti.size}
          </span>
        </div>

        {/* Description */}
        {murti.description && (
          <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
            {murti.description}
          </p>
        )}

        {/* CTA */}
        <div className="mt-auto pt-1">
          {isAvailable ? (
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-sm">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp वर विचारा
            </a>
          ) : (
            <div className="w-full text-center py-2.5 rounded-xl bg-stone-100 border-2 border-stone-200 text-stone-400 text-xs font-bold uppercase tracking-wider">
              सध्या उपलब्ध नाही
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
