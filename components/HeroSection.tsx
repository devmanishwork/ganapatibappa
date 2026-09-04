'use client'

export default function HeroSection() {
  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#260303] via-[#3a0505] to-[#4A0707] min-h-[90vh] flex items-center">

      {/* Decorative rings */}
      <div className="pointer-events-none absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full border-[60px] border-[var(--gold)]/10" />
      <div className="pointer-events-none absolute -right-16 top-0 w-[320px] h-[320px] rounded-full border-[40px] border-[var(--gold)]/8" />
      <div className="pointer-events-none absolute right-24 top-12 w-[180px] h-[180px] rounded-full border-[24px] border-[var(--gold-bright)]/10" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 w-[400px] h-[400px] rounded-full border-[50px] border-[var(--gold)]/8" />
      <div className="pointer-events-none absolute left-8 bottom-8 w-[200px] h-[200px] rounded-full border-[30px] border-[var(--gold-bright)]/10" />

      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

      <div className="section-wrapper relative z-10 py-20">
        <div className="max-w-3xl">

          {/* Section label */}
          <p className="section-label mb-4 text-[var(--gold)]">
            गणपती बाप्पा मोरया! 🙏
          </p>

          {/* Main heading */}
          <h1 className="font-marathi text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            भक्तीची भावना,<br />
            <span className="text-[var(--gold-bright)]">कलाकारीचा स्पर्श</span>
          </h1>

          {/* Subtitle */}
          <p className="font-marathi text-[var(--gold)] text-xl md:text-2xl font-semibold mb-4">
            श्री सिद्धिविनायक गणपती स्टॉल
          </p>

          {/* Description */}
          <p className="font-marathi text-[var(--cream)]/80 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
            आपल्या घरासाठी, मंडळासाठी आणि उत्सवासाठी सुंदर,
            आकर्षक आणि दर्जेदार गणपती मूर्ती.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={scrollToCatalog} className="btn-gold text-base px-8 py-4">
              🙏 मूर्ती पाहा
            </button>
            <a
              href="https://wa.me/919637153890"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-gold text-base px-8 py-4"
            >
              📱 WhatsApp वर संपर्क करा
            </a>
          </div>

          {/* Decorative divider */}
          <div className="mt-16 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--gold)]/30" />
            <span className="text-[var(--gold)] text-2xl">🕉️</span>
            <div className="h-px flex-1 bg-[var(--gold)]/30" />
          </div>

          {/* Quick stats */}
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { icon: '🪔', text: 'दर्जेदार मूर्ती' },
              { icon: '📦', text: 'विविध आकार' },
              { icon: '📱', text: 'WhatsApp संपर्क' },
              { icon: '📍', text: 'चाळीसगाव' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-2 text-[var(--cream)]/70">
                <span className="text-lg">{item.icon}</span>
                <span className="font-marathi text-sm font-semibold">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gold bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
    </section>
  )
}
