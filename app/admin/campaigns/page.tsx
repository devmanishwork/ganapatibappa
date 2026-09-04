'use client'

import { useState, useEffect } from 'react'
import AdminSidebar from '@/components/AdminSidebar'

export default function CampaignsAdminPage() {
  const [announcementText, setAnnouncementText] = useState('')
  const [offerTitle, setOfferTitle] = useState('')
  const [offerText, setOfferText] = useState('')
  const [offerSubtext, setOfferSubtext] = useState('')
  const [offerCta, setOfferCta] = useState('')
  const [active, setActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/campaigns')
      .then(r => r.json())
      .then(d => {
        if (d) {
          setAnnouncementText(d.announcementText || '')
          setOfferTitle(d.offerTitle || '')
          setOfferText(d.offerText || '')
          setOfferSubtext(d.offerSubtext || '')
          setOfferCta(d.offerCta || '')
          setActive(d.active ?? true)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const res = await fetch('/api/campaigns', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          announcementText,
          offerTitle,
          offerText,
          offerSubtext,
          offerCta,
          active,
        }),
      })
      if (res.ok) {
        setMessage('✅ माहिती यशस्वीरीत्या जतन केली!')
        setTimeout(() => setMessage(''), 4000)
      }
    } catch {
      setMessage('⚠️ जतन करताना चूक झाली.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[var(--cream)]">
      <AdminSidebar activeSection="campaigns" />

      <main className="flex-1 p-6 md:p-10 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-marathi text-2xl md:text-3xl font-bold text-[var(--maroon)]">
            🎉 ऑफर व सूचना व्यवस्थापन (Campaigns)
          </h1>
          <p className="font-marathi text-xs text-[var(--muted)] mt-1">
            वेबसाइटच्या सर्वात वर दिसणारी सूचना पट्टी आणि होमपेजवरील खास सवलत / ऑफर सेक्शन संपादित करा.
          </p>
        </div>

        {message && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm font-semibold p-4 rounded-xl mb-6 shadow-sm">
            {message}
          </div>
        )}

        {loading ? (
          <div className="py-12 text-center text-stone-400 font-marathi">लोड होत आहे...</div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            {/* Top Announcement Bar */}
            <div className="bg-white p-6 rounded-2xl border-2 border-stone-200 shadow-sm space-y-4">
              <h2 className="font-marathi font-bold text-[var(--maroon)] text-base border-b pb-2">
                📢 वरील सूचना पट्टी (Top Announcement Bar)
              </h2>

              <div>
                <label className="section-label block mb-1">सूचना मजकूर (Announcement Text)</label>
                <input
                  type="text"
                  value={announcementText}
                  onChange={e => setAnnouncementText(e.target.value)}
                  placeholder="उदा. 10 सप्टेंबरपूर्वी बुकिंग करा आणि मिळवा खास सवलत!"
                  className="field font-marathi"
                />
              </div>

              {/* Preview */}
              <div className="bg-[#260303] text-[#F4C542] text-xs p-3 rounded-xl font-marathi">
                <span className="opacity-60 text-[10px] block mb-1">पूर्वावलोकन (Live Preview):</span>
                🙏 {announcementText || 'गणपती बाप्पा मोरया!'} 🙏
              </div>
            </div>

            {/* Special Offer Section */}
            <div className="bg-white p-6 rounded-2xl border-2 border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h2 className="font-marathi font-bold text-[var(--maroon)] text-base">
                  🎁 विशेष सवलत सेक्शन (Special Offer Section)
                </h2>
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold font-marathi text-stone-700">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={e => setActive(e.target.checked)}
                    className="w-4 h-4 accent-[var(--gold)]"
                  />
                  होमपेजवर दाखवा
                </label>
              </div>

              <div>
                <label className="section-label block mb-1">ऑफर शीर्षक (Heading)</label>
                <input
                  type="text"
                  value={offerTitle}
                  onChange={e => setOfferTitle(e.target.value)}
                  placeholder="उदा. 🎉 विशेष सवलत 🎉"
                  className="field font-marathi"
                />
              </div>

              <div>
                <label className="section-label block mb-1">मुख्य ऑफर मजकूर (Main Text)</label>
                <textarea
                  rows={2}
                  value={offerText}
                  onChange={e => setOfferText(e.target.value)}
                  placeholder="उदा. 10 सप्टेंबरपूर्वी बुकिंग करा आणि मिळवा खास सवलत!"
                  className="field font-marathi resize-none"
                />
              </div>

              <div>
                <label className="section-label block mb-1">दुय्यम मजकूर (Subtext)</label>
                <input
                  type="text"
                  value={offerSubtext}
                  onChange={e => setOfferSubtext(e.target.value)}
                  placeholder="उदा. मर्यादित संख्येत मूर्ती उपलब्ध."
                  className="field font-marathi"
                />
              </div>

              <div>
                <label className="section-label block mb-1">बटणावरील मजकूर (CTA Button Text)</label>
                <input
                  type="text"
                  value={offerCta}
                  onChange={e => setOfferCta(e.target.value)}
                  placeholder="उदा. 📱 आजच बुकिंग करा"
                  className="field font-marathi"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="btn-gold py-3 px-8 text-sm font-bold shadow-md"
            >
              {saving ? 'जतन करत आहे...' : '💾 बदल जतन करा (Save Changes)'}
            </button>
          </form>
        )}
      </main>
    </div>
  )
}
