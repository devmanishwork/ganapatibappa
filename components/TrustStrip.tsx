export default function TrustStrip() {
  const items = [
    { icon: '🪔', text: 'दर्जेदार मूर्ती' },
    { icon: '🎨', text: 'आकर्षक सजावट' },
    { icon: '📦', text: 'विविध आकार उपलब्ध' },
    { icon: '📱', text: 'WhatsApp वर त्वरित संपर्क' },
  ]

  return (
    <div className="bg-[var(--cream-dark)] gold-border-top gold-border-bottom py-6">
      <div className="section-wrapper">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.text} className="flex flex-col items-center gap-2 text-center py-2">
              <span className="text-3xl">{item.icon}</span>
              <span className="font-marathi font-semibold text-[var(--maroon)] text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
