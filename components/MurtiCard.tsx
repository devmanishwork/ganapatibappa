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

interface MurtiCardProps {
  murti: Murti
}

const WHATSAPP_NUMBER = '9637153890'

export default function MurtiCard({ murti }: MurtiCardProps) {
  const isAvailable = murti.status === 'AVAILABLE'

  const whatsappMessage = encodeURIComponent(
    `नमस्कार! मला "${murti.nameMarathi || murti.name}" (${murti.size}) या गणपती मूर्तीबद्दल अधिक माहिती हवी आहे.\n\nHello! I'm interested in "${murti.name}" (${murti.size}) - ₹${murti.price.toLocaleString('en-IN')}`
  )
  const whatsappUrl = `https://wa.me/91${WHATSAPP_NUMBER}?text=${whatsappMessage}`

  return (
    <div className="card-murti flex flex-col">
      {/* Image */}
      <div className="relative w-full aspect-square bg-orange-50">
        <Image
          src={murti.imageUrl}
          alt={murti.nameMarathi || murti.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Status badge on image */}
        <div className="absolute top-3 right-3">
          {isAvailable ? (
            <span className="badge-available">✓ उपलब्ध</span>
          ) : (
            <span className="badge-outofstock">✕ संपले</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Name */}
        <div>
          <h3 className="text-lg font-bold text-orange-900 leading-tight">
            {murti.nameMarathi || murti.name}
          </h3>
          {murti.nameMarathi && (
            <p className="text-sm text-orange-500">{murti.name}</p>
          )}
        </div>

        {/* Size & Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <span>📏</span>
            <span className="font-medium">आकार: {murti.size}</span>
          </div>
          <div className="text-xl font-bold text-orange-600">
            ₹{murti.price.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Description */}
        {murti.description && (
          <p className="text-sm text-gray-500 line-clamp-2">{murti.description}</p>
        )}

        {/* WhatsApp Button */}
        <div className="mt-auto pt-3">
          {isAvailable ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp वर विचारा
            </a>
          ) : (
            <div className="w-full text-center py-2.5 rounded-lg bg-gray-100 text-gray-400 text-sm font-medium">
              सध्या उपलब्ध नाही
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
