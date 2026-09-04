import Link from 'next/link'

const WA1 = '9637153890'
const WA2 = '8766048648'

export default function Footer() {
  const mapUrl = 'https://www.google.com/maps?q=20.461901,75.006720'

  return (
    <footer className="bg-[#1a0101] text-stone-300 border-t-4 border-[var(--gold)] pt-14 pb-24 md:pb-12">
      <div className="section-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">

          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🛕</span>
              <div>
                <h3 className="font-marathi font-bold text-[var(--gold-bright)] text-lg leading-tight">
                  श्री सिद्धिविनायक गणपती स्टॉल
                </h3>
                <p className="text-xs text-stone-400">Shree Siddhivinayak Ganapati Stall</p>
              </div>
            </div>

            <p className="font-marathi text-sm text-stone-300 leading-relaxed">
              आपल्या घरासाठी, मंडळासाठी आणि उत्सवासाठी सुंदर, आकर्षक आणि दर्जेदार गणपती मूर्ती.
            </p>

            <p className="font-marathi text-sm font-bold text-[var(--gold-bright)]">
              🙏 गणपती बाप्पा मोरया! मंगलमूर्ती मोरया! 🙏
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-marathi text-base font-bold text-white uppercase tracking-wider">
              महत्त्वाच्या लिंक्स
            </h4>
            <ul className="space-y-2.5 font-marathi text-sm">
              <li>
                <a href="/" className="hover:text-[var(--gold)] transition-colors">
                  🏠 मुख्यपृष्ठ
                </a>
              </li>
              <li>
                <a href="/#catalog" className="hover:text-[var(--gold)] transition-colors">
                  🪔 गणपती मूर्ती संग्रह
                </a>
              </li>
              <li>
                <a href="/#gallery" className="hover:text-[var(--gold)] transition-colors">
                  🖼️ गॅलरी व फोटो
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-[var(--gold)] transition-colors">
                  📍 स्टॉलचा पत्ता व नक्षा
                </a>
              </li>
              <li>
                <a href="/#inquiry" className="hover:text-[var(--gold)] transition-colors">
                  📝 मूर्ती बुकिंग चौकशी
                </a>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-[var(--gold)] text-xs text-stone-500 transition-colors">
                  🔐 Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="space-y-4">
            <h4 className="font-marathi text-base font-bold text-white uppercase tracking-wider">
              संपर्क माहिती
            </h4>

            <div className="space-y-2 font-marathi text-sm text-stone-300">
              <p className="flex items-start gap-2">
                <span>📍</span>
                <span>छत्रपती शिवाजी महाराज चौक, सिग्नल पॉईंट, चाळीसगाव</span>
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.me/91${WA1}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-semibold"
                >
                  <span>📱</span>
                  <span>WhatsApp: {WA1}</span>
                </a>
                <a
                  href={`https://wa.me/91${WA2}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-semibold"
                >
                  <span>📱</span>
                  <span>WhatsApp: {WA2}</span>
                </a>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--gold)] hover:underline text-xs pt-1"
                >
                  <span>🗺️</span>
                  <span>Google Maps वर दिशा मिळवा →</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} श्री सिद्धिविनायक गणपती स्टॉल, चाळीसगाव. सर्व हक्क सुरक्षित.</p>
          <p className="font-marathi text-[var(--gold)] font-medium">🙏 बाप्पाच्या आशीर्वादाने सेवेत 🙏</p>
        </div>
      </div>
    </footer>
  )
}
