import { Sparkles, MessageCircle } from 'lucide-react'

interface Campaign {
  id: number
  offerTitle: string
  offerText: string
  offerSubtext?: string
  offerCta: string
}

const WA1 = '9637153890'

export default function OfferSection({ campaign }: { campaign: Campaign }) {
  const waMessage = encodeURIComponent(
    `नमस्कार श्री सिद्धिविनायक गणपती स्टॉल,\n\nमला आपल्या विशेष सवलत / ऑफरबद्दल माहिती हवी आहे.\nकृपया अधिक माहिती द्या.`
  )

  return (
    <section className="bg-gradient-to-r from-[var(--gold)] via-[var(--gold-bright)] to-[var(--gold)] text-[var(--burgundy)] py-12 relative overflow-hidden shadow-inner border-y-4 border-[var(--maroon)]">
      <div className="section-wrapper text-center relative z-10 max-w-3xl mx-auto space-y-3.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--burgundy)]/10 text-[var(--burgundy)] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>खास सण उत्सव ऑफर</span>
        </div>

        <h2 className="font-marathi text-2xl md:text-4xl font-black tracking-tight text-[var(--burgundy)]">
          {campaign.offerTitle}
        </h2>

        <p className="font-marathi text-lg md:text-2xl font-bold leading-snug text-[var(--maroon)]">
          {campaign.offerText}
        </p>

        {campaign.offerSubtext && (
          <p className="font-marathi text-xs md:text-sm font-semibold opacity-90 text-[var(--burgundy)]">
            {campaign.offerSubtext}
          </p>
        )}

        <div className="pt-2">
          <a
            href={`https://wa.me/91${WA1}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-maroon text-xs md:text-sm px-7 py-3 shadow-md inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>{campaign.offerCta || 'आजच बुकिंग करा'}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
