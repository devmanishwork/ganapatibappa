'use client'

export default function AnnouncementBar({ text }: { text: string }) {
  return (
    <div className="bg-[#260303] text-[#F4C542] text-sm py-2 overflow-hidden border-b border-[var(--gold)]/30">
      <div className="flex">
        <div className="marquee-track flex gap-16 whitespace-nowrap">
          {[1, 2].map(i => (
            <span key={i} className="font-marathi font-semibold">
              🙏 {text} 🙏 &nbsp;&nbsp;|&nbsp;&nbsp; गणपती बाप्पा मोरया! &nbsp;&nbsp;|&nbsp;&nbsp; 📱 WhatsApp: 9637153890 &nbsp;&nbsp;|&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
