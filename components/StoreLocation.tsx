const WA1 = '9637153890'
const WA2 = '8766048648'

export default function StoreLocation() {
  const mapUrl = 'https://www.google.com/maps?q=20.461901,75.006720'

  return (
    <div className="bg-[var(--cream-dark)] py-16 gold-border-top gold-border-bottom">
      <div className="section-wrapper">
        <div className="text-center mb-12">
          <p className="section-label mb-2">आमचा पत्ता</p>
          <h2 className="font-marathi text-3xl md:text-4xl font-bold text-[var(--maroon)]">
            आमच्या दुकानाला भेट द्या
          </h2>
          <div className="gold-divider mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-6 md:p-10 rounded-3xl border-2 border-[var(--border)] shadow-[6px_6px_0px_var(--gold)]">
          {/* Left: Contact info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--cream)] border-2 border-[var(--border)] flex items-center justify-center text-2xl shrink-0">
                📍
              </div>
              <div>
                <h3 className="font-marathi text-lg font-bold text-[var(--maroon)]">स्टॉलचा पत्ता</h3>
                <p className="font-marathi text-base font-semibold text-stone-700 mt-1">
                  छत्रपती शिवाजी महाराज चौक, सिग्नल पॉईंट, चाळीसगाव
                </p>
                <p className="text-xs text-[var(--muted)] mt-0.5">जिल्हा: जळगाव, महाराष्ट्र</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-sm py-3 px-5 text-center flex-1"
              >
                📍 Google Maps वर दिशा मिळवा
              </a>
            </div>

            <hr className="border-[var(--border)]" />

            {/* Phone & WhatsApp */}
            <div className="space-y-3">
              <h4 className="font-marathi text-sm font-bold text-[var(--maroon)] uppercase tracking-wider">
                📞 थेट संपर्क व WhatsApp:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/91${WA1}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-xs py-2.5 px-4 justify-between"
                >
                  <span>📱 {WA1}</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">WhatsApp</span>
                </a>

                <a
                  href={`https://wa.me/91${WA2}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-xs py-2.5 px-4 justify-between"
                >
                  <span>📱 {WA2}</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">WhatsApp</span>
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
