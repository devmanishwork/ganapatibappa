'use client'

import { useState, useEffect } from 'react'
import { Inbox, MessageCircle, Phone, Tag, Calendar, Loader2 } from 'lucide-react'
import AdminSidebar from '@/components/AdminSidebar'

interface Inquiry {
  id: number
  name: string
  phone: string
  productId: string | null
  productName: string | null
  message: string | null
  createdAt: string
}

export default function InquiriesAdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/inquiries')
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d)) setInquiries(d)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="flex min-h-screen bg-[var(--cream)]">
      <AdminSidebar activeSection="inquiries" />

      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        <div className="mb-6">
          <h1 className="font-marathi text-2xl font-bold text-[var(--maroon)]">
            ग्राहक चौकशी यादी (Inquiries)
          </h1>
          <p className="font-marathi text-xs text-[var(--muted)] mt-1">
            वेबसाइटवरून ग्राहकांनी केलेल्या चौकशी आणि बुकिंग विनंत्या.
          </p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-[#1c0202] text-[var(--gold-bright)] font-marathi font-bold text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4" />
              <span>प्राप्त चौकशी ({inquiries.length})</span>
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-stone-400 font-marathi flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" />
              <span>लोड होत आहे...</span>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="py-16 text-center text-stone-400 font-marathi">
              <Inbox className="w-10 h-10 mx-auto mb-2 text-stone-300" />
              <p className="text-xs">अद्याप कोणतीही चौकशी प्राप्त झालेली नाही.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {inquiries.map(inq => {
                const waText = encodeURIComponent(
                  `नमस्कार ${inq.name} जी,\n\nश्री सिद्धिविनायक गणपती स्टॉलकडे आपण केलेल्या चौकशीबद्दल धन्यवाद.${inq.productId ? '\nमूर्ती क्रमांक: ' + inq.productId : ''}\n\nआम्ही आपल्याला कशी मदत करू शकतो?`
                )
                const waUrl = `https://wa.me/91${inq.phone.replace(/[^0-9]/g, '')}?text=${waText}`

                return (
                  <div key={inq.id} className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-stone-50 transition-colors">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <h3 className="font-marathi font-bold text-[var(--maroon)] text-sm">
                          {inq.name}
                        </h3>
                        <span className="text-[11px] text-stone-400 flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3" />
                          {new Date(inq.createdAt).toLocaleDateString('mr-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 text-xs text-stone-600">
                        <span className="flex items-center gap-1 font-mono">
                          <Phone className="w-3.5 h-3.5 text-stone-400" />
                          {inq.phone}
                        </span>
                        {inq.productId && (
                          <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {inq.productId}
                          </span>
                        )}
                      </div>

                      {inq.message && (
                        <p className="font-marathi text-xs text-stone-600 pt-0.5">
                          {inq.message}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp text-xs py-2 px-3.5 inline-flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp वर उत्तर द्या</span>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
