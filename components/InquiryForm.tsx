'use client'

import { useState } from 'react'
import { Send, User, Phone, Tag, Ruler, MessageSquare, Loader2 } from 'lucide-react'

const WA1 = '9637153890'

export default function InquiryForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [productId, setProductId] = useState('')
  const [height, setHeight] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return

    setSubmitting(true)

    // Save inquiry to backend in background
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, productId, message: `${height ? 'उंची: ' + height + ' | ' : ''}${message}` }),
      })
    } catch {}

    // Build WhatsApp message
    const waText = encodeURIComponent(
      `नमस्कार श्री सिद्धिविनायक गणपती स्टॉल,\n\nमला गणपती मूर्तीबद्दल चौकशी करायची आहे:\n\nनाव: ${name}\nमोबाईल नंबर: ${phone}\nमूर्ती क्रमांक: ${productId || 'नमूद नाही'}\nमूर्तीची उंची: ${height || 'नमूद नाही'}\nसंदेश: ${message || 'उपलब्धता आणि किंमत कळवा.'}\n\nकृपया लवकर संपर्क करा. धन्यवाद!`
    )

    // Open WhatsApp
    window.open(`https://wa.me/91${WA1}?text=${waText}`, '_blank')

    setSubmitting(false)
    setName('')
    setPhone('')
    setProductId('')
    setHeight('')
    setMessage('')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <p className="section-label text-[var(--gold)] mb-2">थेट संपर्क व बुकिंग</p>
        <h2 className="font-marathi text-3xl md:text-4xl font-bold text-white">
          मूर्ती बुक करण्यासाठी संपर्क करा
        </h2>
        <p className="font-marathi text-xs md:text-sm text-[var(--cream)]/80 mt-2">
          खालील माहिती भरा आणि थेट WhatsApp द्वारे बुकिंग किंवा चौकशी करा.
        </p>
        <div className="gold-divider mx-auto mt-4" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[var(--gold)] shadow-lg space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="section-label block mb-1 text-[var(--maroon)] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>नाव *</span>
            </label>
            <input
              type="text"
              required
              placeholder="आपले पूर्ण नाव"
              value={name}
              onChange={e => setName(e.target.value)}
              className="field font-marathi"
            />
          </div>

          <div>
            <label className="section-label block mb-1 text-[var(--maroon)] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>मोबाईल नंबर *</span>
            </label>
            <input
              type="tel"
              required
              placeholder="१० अंकी मोबाईल नंबर"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="field"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="section-label block mb-1 text-[var(--maroon)] flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>मूर्ती क्रमांक / आयडी (ऐच्छिक)</span>
            </label>
            <input
              type="text"
              placeholder="उदा. GNP-001"
              value={productId}
              onChange={e => setProductId(e.target.value)}
              className="field font-mono"
            />
          </div>

          <div>
            <label className="section-label block mb-1 text-[var(--maroon)] flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5" />
              <span>मूर्तीची उंची / आकार (ऐच्छिक)</span>
            </label>
            <input
              type="text"
              placeholder="उदा. 3 फूट / 2.5 फूट"
              value={height}
              onChange={e => setHeight(e.target.value)}
              className="field font-marathi"
            />
          </div>
        </div>

        <div>
          <label className="section-label block mb-1 text-[var(--maroon)] flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>संदेश किंवा विशेष आवश्यकता (ऐच्छिक)</span>
          </label>
          <textarea
            rows={3}
            placeholder="आपल्याला हवी असलेली माहिती किंवा विचारणा येथे लिहा..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="field font-marathi resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-whatsapp w-full py-3.5 text-sm font-bold shadow-md flex items-center justify-center gap-2"
        >
          {submitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>तयार करत आहे...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              <span>WhatsApp वर पाठवा</span>
            </div>
          )}
        </button>
      </form>
    </div>
  )
}
