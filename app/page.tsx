import { prisma } from '@/lib/prisma'
import MurtiCard from '@/components/MurtiCard'

export const revalidate = 0

export default async function Home() {
  let murtis: any[] = []
  try {
    murtis = await prisma.murti.findMany({ orderBy: { createdAt: 'desc' } })
  } catch (e) {}

  const available  = murtis.filter(m => m.status === 'AVAILABLE')
  const outOfStock = murtis.filter(m => m.status === 'OUT_OF_STOCK')

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>

      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <header className="relative overflow-hidden bg-[#0F0A00]">

        {/* Decorative mandala rings (pure CSS) */}
        <div className="pointer-events-none absolute -right-24 -top-24 w-96 h-96 rounded-full border-[40px] border-orange-900/30" />
        <div className="pointer-events-none absolute -right-12 -top-12 w-64 h-64 rounded-full border-[28px] border-orange-700/20" />
        <div className="pointer-events-none absolute right-16 top-4  w-40 h-40 rounded-full border-[18px] border-yellow-600/20" />
        {/* Left side rings */}
        <div className="pointer-events-none absolute -left-20 bottom-0 w-72 h-72 rounded-full border-[32px] border-orange-900/20" />

        <div className="relative max-w-6xl mx-auto px-5 py-10 md:py-14">

          {/* Top strip */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold tracking-widest uppercase">
              <span>🕉️</span>
              <span>Shree Siddhivinayak</span>
            </div>
            <a
              href="https://wa.me/919637153890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              9637153890
            </a>
          </div>

          {/* Main heading */}
          <div className="max-w-2xl">
            <p className="section-label text-orange-500 mb-3">गणपती बाप्पा मोरया 🙏</p>
            <h1 className="font-marathi text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
              श्री सिद्धिविनायक
              <br />
              <span className="text-[#F4600C]">गणपती स्टॉल</span>
            </h1>
            <p className="text-stone-400 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              हस्तनिर्मित गणपती मूर्तींचा अनोखा संग्रह —{' '}
              <span className="text-orange-300 font-semibold">विविध आकार व किंमतींमध्ये</span> उपलब्ध.
              मूर्ती आवडल्यास थेट WhatsApp वर संपर्क करा.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4">
              {[
                { value: murtis.length, label: 'एकूण मूर्ती', color: 'text-white' },
                { value: available.length, label: 'उपलब्ध', color: 'text-emerald-400' },
                { value: outOfStock.length, label: 'संपले', color: 'text-stone-400' },
              ].map(stat => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center min-w-[90px]">
                  <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                  <div className="font-marathi text-xs text-stone-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Saffron stripe accent at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />
        </div>
      </header>

      {/* ═══════════════════════════════════════════════
          MAIN CATALOG
      ═══════════════════════════════════════════════ */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12">

        {murtis.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-32 gap-5 text-center">
            <div className="w-24 h-24 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-5xl">
              🪔
            </div>
            <div>
              <h2 className="font-marathi text-2xl font-bold text-stone-700">लवकरच येत आहे</h2>
              <p className="text-stone-400 text-sm mt-1">मूर्ती लवकरच उपलब्ध होतील.</p>
            </div>
            <a
              href="https://wa.me/919637153890"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              📱 आत्ता चौकशी करा
            </a>
          </div>

        ) : (
          <>
            {/* ── Available ──────────────────────── */}
            {available.length > 0 && (
              <section className="mb-16">
                <div className="flex items-end justify-between mb-7">
                  <div>
                    <p className="section-label mb-1">आत्ता घरी न्या</p>
                    <h2 className="text-2xl md:text-3xl font-black text-stone-900 flex items-center gap-3">
                      उपलब्ध मूर्ती
                      <span className="text-base font-bold bg-emerald-500 text-white px-3 py-0.5 rounded-full">
                        {available.length}
                      </span>
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {available.map(m => <MurtiCard key={m.id} murti={m} />)}
                </div>
              </section>
            )}

            {/* ── Divider ────────────────────────── */}
            {available.length > 0 && outOfStock.length > 0 && (
              <div className="relative my-12 flex items-center gap-5">
                <div className="flex-1 h-px bg-stone-200" />
                <span className="font-marathi text-stone-400 text-sm font-semibold shrink-0">
                  🕉️ &nbsp; सध्या संपलेल्या मूर्ती &nbsp; 🕉️
                </span>
                <div className="flex-1 h-px bg-stone-200" />
              </div>
            )}

            {/* ── Out of Stock ────────────────────── */}
            {outOfStock.length > 0 && (
              <section>
                <div className="mb-7">
                  <p className="section-label mb-1 text-stone-400">सध्या उपलब्ध नाही</p>
                  <h2 className="text-2xl md:text-3xl font-black text-stone-400 flex items-center gap-3">
                    संपलेल्या मूर्ती
                    <span className="text-base font-bold bg-stone-200 text-stone-500 px-3 py-0.5 rounded-full">
                      {outOfStock.length}
                    </span>
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 opacity-70">
                  {outOfStock.map(m => <MurtiCard key={m.id} murti={m} />)}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* ═══════════════════════════════════════════════
          STICKY WHATSAPP BAR (mobile)
      ═══════════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/80 backdrop-blur-md border-t border-stone-200 md:hidden">
        <a
          href="https://wa.me/919637153890"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="font-marathi">WhatsApp वर संपर्क करा — 9637153890</span>
        </a>
      </div>

      {/* ═══════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════ */}
      <footer className="bg-[#0F0A00] text-stone-500 mt-20 pb-20 md:pb-8">
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-marathi text-white font-bold text-lg">श्री सिद्धिविनायक गणपती स्टॉल</h3>
            <p className="text-stone-500 text-sm mt-1">हस्तनिर्मित गणपती मूर्तींचा संग्रह</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <a
              href="https://wa.me/919637153890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              +91 9637153890
            </a>
            <p className="font-marathi text-orange-700 text-sm">🙏 गणपती बाप्पा मोरया!</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
