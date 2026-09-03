import { prisma } from '@/lib/prisma'
import MurtiCard from '@/components/MurtiCard'

export const revalidate = 0

export default async function Home() {
  let murtis: any[] = []
  try {
    murtis = await prisma.murti.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (e) {
    // DB not ready yet
  }

  const available = murtis.filter((m) => m.status === 'AVAILABLE')
  const outOfStock = murtis.filter((m) => m.status === 'OUT_OF_STOCK')

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FFF8F0, #FFFFFF)' }}>
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-4xl">🕉️</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
                श्री सिद्धिविनायक गणपती स्टॉल
              </h1>
              <p className="text-orange-100 text-sm md:text-base mt-0.5">
                Shree Siddhivinayak Ganapati Stall
              </p>
            </div>
            <span className="text-4xl">🕉️</span>
          </div>
          <p className="text-orange-100 text-sm mt-2">
            ✨ सुंदर हस्तनिर्मित गणपती मूर्तींचा संग्रह ✨
          </p>
          {/* WhatsApp contact in header */}
          <a
            href="https://wa.me/919637153890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 bg-green-500 hover:bg-green-600 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-md"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            9637153890 वर संपर्क करा
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {murtis.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-6xl mb-4">🪔</div>
            <p className="text-xl font-medium text-gray-500">लवकरच मूर्ती उपलब्ध होतील</p>
            <p className="text-sm mt-1">Coming soon...</p>
          </div>
        ) : (
          <>
            {/* Available Section */}
            {available.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-xl font-bold text-orange-800">
                    ✅ उपलब्ध मूर्ती
                  </h2>
                  <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                    {available.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {available.map((murti) => (
                    <MurtiCard key={murti.id} murti={murti} />
                  ))}
                </div>
              </section>
            )}

            {/* Divider */}
            {available.length > 0 && outOfStock.length > 0 && (
              <div className="om-divider my-8">🕉 🕉 🕉</div>
            )}

            {/* Out of Stock Section */}
            {outOfStock.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-xl font-bold text-gray-600">
                    ⏳ सध्या उपलब्ध नाही
                  </h2>
                  <span className="bg-gray-100 text-gray-500 text-sm font-semibold px-3 py-1 rounded-full">
                    {outOfStock.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 opacity-80">
                  {outOfStock.map((murti) => (
                    <MurtiCard key={murti.id} murti={murti} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-orange-900 text-orange-200 text-center py-6 mt-16">
        <p className="text-sm">🕉️ श्री सिद्धिविनायक गणपती स्टॉल 🕉️</p>
        <p className="text-xs mt-1 text-orange-300">
          गणपती बाप्पा मोरया! 🙏
        </p>
        <a
          href="https://wa.me/919637153890"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 text-green-400 hover:text-green-300 text-sm"
        >
          📱 WhatsApp: +91 9637153890
        </a>
      </footer>
    </div>
  )
}
