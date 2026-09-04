import { ShieldCheck, Palette, Ruler, MessageSquare } from 'lucide-react'

export default function TrustStrip() {
  const items = [
    { icon: ShieldCheck, title: 'दर्जेदार मूर्ती', desc: 'उत्कृष्ट कारागिरी व फिनिशिंग' },
    { icon: Palette, title: 'आकर्षक कलाकुसर', desc: 'सुंदर रंगसंगती व डिझाईन' },
    { icon: Ruler, title: 'विविध आकार उपलब्ध', desc: 'लहान ते भव्य मंडळ आकार' },
    { icon: MessageSquare, title: 'त्वरित WhatsApp संपर्क', desc: 'थेट व जलद बुकिंग सहाय्य' },
  ]

  return (
    <div className="bg-[var(--cream-dark)] gold-border-top gold-border-bottom py-6 border-b border-[var(--border)]">
      <div className="section-wrapper">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 rounded-xl bg-white border border-[var(--border)] flex items-center justify-center shrink-0 text-[var(--maroon)] shadow-sm">
                  <Icon className="w-5 h-5 text-[var(--maroon)]" />
                </div>
                <div>
                  <h4 className="font-marathi font-bold text-[var(--maroon)] text-xs md:text-sm leading-tight">
                    {item.title}
                  </h4>
                  <p className="font-marathi text-[11px] text-[var(--muted)] mt-0.5 hidden sm:block">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
