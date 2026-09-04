import { MapPin, Navigation, MessageCircle, Phone, Compass } from 'lucide-react'

const WA1 = '9637153890'
const WA2 = '8766048648'

export default function StoreLocation() {
  const mapUrl = 'https://www.google.com/maps?q=20.461901,75.006720'

  return (
    <div className="bg-[var(--cream-dark)] py-16 gold-border-top gold-border-bottom">
      <div className="section-wrapper">
        <div className="text-center mb-12">
          <p className="section-label mb-2">स्टॉलचे ठिकाण</p>
          <h2 className="font-marathi text-3xl md:text-4xl font-bold text-[var(--maroon)]">
            आमच्या दुकानाला भेट द्या
          </h2>
          <div className="gold-divider mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-6 md:p-10 rounded-3xl border-2 border-[var(--border)] shadow-md">
          {/* Left: Contact info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--cream)] border-2 border-[var(--border)] flex items-center justify-center text-[var(--maroon)] shrink-0 shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-marathi text-base md:text-lg font-bold text-[var(--maroon)]">स्टॉलचा मुख्य पत्ता</h3>
                <p className="font-marathi text-base font-semibold text-stone-800 mt-1">
                  छत्रपती शिवाजी महाराज चौक, सिग्नल पॉईंट, चाळीसगाव
                </p>
                <p className="text-xs text-[var(--muted)] mt-0.5">जिल्हा: जळगाव, महाराष्ट्र (४२४१०१)</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-xs md:text-sm py-3 px-5 text-center flex-1 flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Google Maps वर दिशा मिळवा</span>
              </a>
            </div>

            <hr className="border-[var(--border)]" />

            {/* Phone & WhatsApp */}
            <div className="space-y-3">
              <h4 className="font-marathi text-xs font-bold text-[var(--maroon)] uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>थेट संपर्क व WhatsApp नंबर:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/91${WA1}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-xs py-2.5 px-4 justify-between"
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{WA1}</span>
                  </div>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">WhatsApp</span>
                </a>

                <a
                  href={`https://wa.me/91${WA2}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-xs py-2.5 px-4 justify-between bg-emerald-700 hover:bg-emerald-600"
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{WA2}</span>
                  </div>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Embedded map */}
          <div className="w-full h-80 rounded-2xl overflow-hidden border-2 border-[var(--border)] shadow-md bg-stone-100">
            <iframe
              title="Shree Siddhivinayak Ganapati Stall Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=20.461901,75.006720&hl=mr&z=16&output=embed"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
