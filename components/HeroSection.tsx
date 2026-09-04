'use client'

import { MessageCircle, Compass, ShieldCheck, Sparkles, Layers, MapPin } from 'lucide-react'

export default function HeroSection() {
  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1e0202] via-[#2f0404] to-[#450707] min-h-[85vh] flex items-center">
      {/* Decorative architectural background rings */}
      <div className="pointer-events-none absolute -right-32 -top-32 w-[480px] h-[480px] rounded-full border-[50px] border-[var(--gold)]/10" />
      <div className="pointer-events-none absolute -right-16 top-0 w-[300px] h-[300px] rounded-full border-[30px] border-[var(--gold)]/8" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 w-[380px] h-[380px] rounded-full border-[40px] border-[var(--gold)]/8" />

      {/* Gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

      <div className="section-wrapper relative z-10 py-16 md:py-24">
        <div className="max-w-3xl">

          {/* Section badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold-bright)] text-xs font-semibold uppercase tracking-widest mb-6 font-marathi">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-bright)] animate-ping" />
            गणपती बाप्पा मोरया · मंगलमूर्ती मोरया
          </div>

          {/* Main heading */}
          <h1 className="font-marathi text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.15] mb-5 tracking-tight">
            भक्तीची भावना,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold-bright)] via-[var(--gold)] to-[var(--gold-light)]">
              कलाकारीचा स्पर्श
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-marathi text-[var(--gold-bright)] text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
            <span>श्री सिद्धिविनायक गणपती स्टॉल</span>
            <span className="text-xs text-[var(--cream)]/60 font-normal">| चाळीसगाव</span>
          </p>

          {/* Description */}
          <p className="font-marathi text-[var(--cream)]/85 text-base md:text-lg leading-relaxed mb-8 max-w-xl font-normal">
            आपल्या घरासाठी, मंडळासाठी आणि उत्सवासाठी सुंदर, आकर्षक आणि दर्जेदार गणपती मूर्तींचा समृद्ध संग्रह.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3.5">
            <button onClick={scrollToCatalog} className="btn-gold text-sm md:text-base px-8 py-3.5">
              <span>मूर्ती संग्रह पाहा</span>
              <Compass className="w-4 h-4 ml-1" />
            </button>

            <a
              href="https://wa.me/919637153890"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-gold text-sm md:text-base px-7 py-3.5"
            >
              <MessageCircle className="w-4 h-4 mr-1.5 text-emerald-400" />
              <span>WhatsApp वर संपर्क करा</span>
            </a>
          </div>

          {/* Highlights Row */}
          <div className="mt-12 pt-8 border-t border-[var(--gold)]/20 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: ShieldCheck, text: 'दर्जेदार मूर्ती' },
              { icon: Sparkles, text: 'आकर्षक सजावट' },
              { icon: Layers, text: 'विविध आकार' },
              { icon: MapPin, text: 'सिग्नल पॉईंट, चाळीसगाव' },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="flex items-center gap-2 text-[var(--cream)]/80">
                  <Icon className="w-4 h-4 text-[var(--gold)] shrink-0" />
                  <span className="font-marathi text-xs font-semibold">{item.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Gold bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
    </section>
  )
}
