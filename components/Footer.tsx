import Link from 'next/link'
import { MapPin, Phone, MessageCircle, Navigation, ExternalLink, Lock } from 'lucide-react'

const WA1 = '9637153890'
const WA2 = '8766048648'

export default function Footer() {
  const mapUrl = 'https://www.google.com/maps?q=20.461901,75.006720'

  return (
    <footer className="bg-[#150101] text-stone-300 border-t-4 border-[var(--gold)] pt-14 pb-24 md:pb-12">
      <div className="section-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">

          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--maroon)] border border-[var(--gold)]/60 flex items-center justify-center text-[var(--gold-bright)] font-bold text-base shadow-sm">
                ॐ
              </div>
              <div>
                <h3 className="font-marathi font-bold text-[var(--gold-bright)] text-base md:text-lg leading-tight">
                  श्री सिद्धिविनायक गणपती स्टॉल
                </h3>
                <p className="text-xs text-stone-400">Shree Siddhivinayak Ganapati Stall · Chalisgaon</p>
              </div>
            </div>

            <p className="font-marathi text-xs md:text-sm text-stone-300 leading-relaxed">
              आपल्या घरासाठी, मंडळासाठी आणि उत्सवासाठी सुंदर, आकर्षक आणि दर्जेदार गणपती मूर्तींचा विश्वसनीय संग्रह.
            </p>

            <div className="pt-1">
              <span className="font-marathi text-xs font-bold text-[var(--gold-bright)] bg-[var(--gold)]/10 px-3 py-1 rounded-full border border-[var(--gold)]/30">
                गणपती बाप्पा मोरया · मंगलमूर्ती मोरया
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3.5">
            <h4 className="font-marathi text-sm font-bold text-white uppercase tracking-wider">
              महत्त्वाच्या लिंक्स
            </h4>
            <ul className="space-y-2 font-marathi text-xs md:text-sm">
              <li>
                <a href="/" className="hover:text-[var(--gold)] transition-colors inline-flex items-center gap-1.5">
                  <span>मुख्यपृष्ठ</span>
                </a>
              </li>
              <li>
                <a href="/#catalog" className="hover:text-[var(--gold)] transition-colors inline-flex items-center gap-1.5">
                  <span>गणपती मूर्ती संग्रह</span>
                </a>
              </li>
              <li>
                <a href="/#gallery" className="hover:text-[var(--gold)] transition-colors inline-flex items-center gap-1.5">
                  <span>गॅलरी व फोटो</span>
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-[var(--gold)] transition-colors inline-flex items-center gap-1.5">
                  <span>स्टॉलचा पत्ता व नक्षा</span>
                </a>
              </li>
              <li>
                <a href="/#inquiry" className="hover:text-[var(--gold)] transition-colors inline-flex items-center gap-1.5">
                  <span>मूर्ती बुकिंग चौकशी</span>
                </a>
              </li>
              <li className="pt-1">
                <Link href="/admin/login" className="hover:text-[var(--gold)] text-xs text-stone-400 transition-colors inline-flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Admin Login</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="space-y-3.5">
            <h4 className="font-marathi text-sm font-bold text-white uppercase tracking-wider">
              संपर्क माहिती
            </h4>

            <div className="space-y-2.5 font-marathi text-xs md:text-sm text-stone-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" />
                <span>छत्रपती शिवाजी महाराज चौक, सिग्नल पॉईंट, चाळीसगाव</span>
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.me/91${WA1}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: {WA1}</span>
                </a>
                <a
                  href={`https://wa.me/91${WA2}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>संपर्क: {WA2}</span>
                </a>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[var(--gold)] hover:underline text-xs pt-1"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Google Maps वर दिशा मिळवा</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} श्री सिद्धिविनायक गणपती स्टॉल, चाळीसगाव. सर्व हक्क सुरक्षित.</p>
          <p className="font-marathi text-[var(--gold)]/80 text-[11px]">बाप्पाच्या आशीर्वादाने सेवेत</p>
        </div>
      </div>
    </footer>
  )
}
