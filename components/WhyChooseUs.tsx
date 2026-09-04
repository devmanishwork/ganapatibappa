import { Award, Palette, Package, PhoneCall } from 'lucide-react'

export default function WhyChooseUs() {
  const cards = [
    {
      icon: Award,
      title: 'दर्जेदार मूर्ती',
      desc: 'आकर्षक आणि सुंदर मूर्तींची निवड. प्रत्येक मूर्ती कुशल कारागिरांनी घडवलेली.',
    },
    {
      icon: Palette,
      title: 'सुंदर कलाकुसर',
      desc: 'प्रत्येक मूर्तीमध्ये अप्रतिम रंगकाम, बारीक नक्षीकाम आणि कलाकारीचा स्पर्श.',
    },
    {
      icon: Package,
      title: 'विविध आकार',
      desc: 'घरगुती पूजा तसेच मंडळाच्या गरजेनुसार ४ इंचांपासून ते मोठ्या आकारांपर्यंत उपलब्ध.',
    },
    {
      icon: PhoneCall,
      title: 'त्वरित संपर्क',
      desc: 'WhatsApp वर थेट व जलद संपर्क करून आवडीची मूर्ती सहज बुक करण्याची सुविधा.',
    },
  ]

  return (
    <section className="bg-[var(--burgundy)] py-16 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--maroon)] rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="section-wrapper relative z-10">
        <div className="text-center mb-12">
          <p className="section-label text-[var(--gold)] mb-2">आमची वैशिष्ट्ये</p>
          <h2 className="font-marathi text-3xl md:text-4xl font-bold text-white">
            आम्हालाच का निवडाल?
          </h2>
          <div className="gold-divider mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <div
                key={i}
                className="bg-white/5 border border-[var(--gold)]/30 hover:border-[var(--gold)] rounded-2xl p-6 transition-all hover:-translate-y-1 hover:bg-white/10 flex flex-col gap-3 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--maroon)] border border-[var(--gold)]/40 flex items-center justify-center mx-auto shadow-md text-[var(--gold-bright)]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-marathi text-base font-bold text-[var(--gold-bright)]">
                  {card.title}
                </h3>
                <p className="font-marathi text-xs leading-relaxed text-stone-300">
                  {card.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
