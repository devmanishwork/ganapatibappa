export default function WhyChooseUs() {
  const cards = [
    {
      icon: '🪔',
      title: 'दर्जेदार मूर्ती',
      desc: 'आकर्षक आणि सुंदर मूर्तींची निवड. प्रत्येक मूर्ती उत्कृष्ट कारागिरांनी घडवलेली.',
    },
    {
      icon: '🎨',
      title: 'सुंदर कलाकुसर',
      desc: 'प्रत्येक मूर्तीमध्ये कलाकारीचा सुंदर स्पर्श आणि अप्रतिम रंगकाम.',
    },
    {
      icon: '📦',
      title: 'विविध आकार',
      desc: 'घरगुती तसेच मंडळाच्या गरजेनुसार विविध लहान-मोठे आकार उपलब्ध.',
    },
    {
      icon: '📱',
      title: 'त्वरित संपर्क',
      desc: 'WhatsApp वर थेट आणि जलद संपर्क करून सहज बुकिंगची सुविधा.',
    },
  ]

  return (
    <section className="bg-[var(--burgundy)] py-16 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--maroon)] rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="section-wrapper relative z-10">
        <div className="text-center mb-12">
          <p className="section-label text-[var(--gold)] mb-2">आमची वैशिष्ट्ये</p>
          <h2 className="font-marathi text-3xl md:text-4xl font-bold text-white">
            आम्हालाच का निवडाल?
          </h2>
          <div className="gold-divider mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white/5 border-2 border-[var(--gold)]/30 hover:border-[var(--gold)] rounded-2xl p-6 transition-all hover:-translate-y-1 hover:bg-white/10 flex flex-col gap-3 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[var(--maroon)] border border-[var(--gold)]/40 flex items-center justify-center text-3xl mx-auto shadow-md">
                {card.icon}
              </div>
              <h3 className="font-marathi text-lg font-bold text-[var(--gold-bright)]">
                {card.title}
              </h3>
              <p className="font-marathi text-xs leading-relaxed text-stone-300">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
