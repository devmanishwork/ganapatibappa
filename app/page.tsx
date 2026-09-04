import { prisma } from '@/lib/prisma'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import TrustStrip from '@/components/TrustStrip'
import ProductGrid from '@/components/ProductGrid'
import OfferSection from '@/components/OfferSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import MasonryGallery from '@/components/MasonryGallery'
import StoreLocation from '@/components/StoreLocation'
import InquiryForm from '@/components/InquiryForm'
import Footer from '@/components/Footer'
import FloatingWhatsApp, { StickyMobileBar } from '@/components/FloatingWhatsApp'

export const revalidate = 0

export default async function Home() {
  // Fetch all data server-side
  const [products, categories, gallery, campaign] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: 'desc' }, include: { category: true } }).catch(() => []),
    prisma.category.findMany({ orderBy: { name: 'asc' } }).catch(() => []),
    prisma.galleryImage.findMany({ orderBy: { sortOrder: 'asc' } }).catch(() => []),
    prisma.campaign.findFirst().catch(() => null),
  ])

  const defaultCampaign = {
    id: 1,
    announcementText: '🙏 गणपती बाप्पा मोरया! 🙏',
    offerTitle: '🎉 विशेष सवलत 🎉',
    offerText: '10 सप्टेंबरपूर्वी बुकिंग करा आणि मिळवा खास सवलत!',
    offerSubtext: 'मर्यादित संख्येत मूर्ती उपलब्ध.',
    offerCta: '📱 आजच बुकिंग करा',
    active: true,
  }
  const activeCampaign = campaign || defaultCampaign

  return (
    <div className="min-h-screen">
      {/* 1. Announcement Bar */}
      <AnnouncementBar text={activeCampaign.announcementText} />

      {/* 2. Navigation */}
      <Navbar />

      {/* 3. Hero Section */}
      <HeroSection />

      {/* 4. Trust Strip */}
      <TrustStrip />

      {/* 5+6. Catalog with Category Filter */}
      <section id="catalog" className="py-16">
        <div className="section-wrapper">
          <div className="text-center mb-10">
            <p className="section-label mb-2">आमचा संग्रह</p>
            <h2 className="font-marathi text-4xl font-bold text-[var(--maroon)]">
              गणपती बाप्पांच्या सुंदर मूर्ती
            </h2>
            <div className="gold-divider mx-auto mt-4" />
          </div>

          <ProductGrid
            initialProducts={JSON.parse(JSON.stringify(products))}
            categories={JSON.parse(JSON.stringify(categories))}
          />
        </div>
      </section>

      {/* 7. Offer Section */}
      {activeCampaign.active && (
        <OfferSection campaign={JSON.parse(JSON.stringify(activeCampaign))} />
      )}

      {/* 8. Why Choose Us */}
      <WhyChooseUs />

      {/* 9. Gallery */}
      <section id="gallery" className="py-16 bg-[var(--cream)]">
        <div className="section-wrapper">
          <div className="text-center mb-10">
            <p className="section-label mb-2">आमच्या मूर्ती</p>
            <h2 className="font-marathi text-4xl font-bold text-[var(--maroon)]">
              आमच्या मूर्तींची झलक
            </h2>
            <div className="gold-divider mx-auto mt-4" />
          </div>
          <MasonryGallery images={JSON.parse(JSON.stringify(gallery))} />
        </div>
      </section>

      {/* 10. Store Location */}
      <section id="contact">
        <StoreLocation />
      </section>

      {/* 11. About */}
      <section id="about" className="py-16 bg-white">
        <div className="section-wrapper">
          <div className="max-w-2xl mx-auto text-center">
            <p className="section-label mb-2">आमच्याबद्दल</p>
            <h2 className="font-marathi text-3xl font-bold text-[var(--maroon)] mb-4">
              श्री सिद्धिविनायक गणपती स्टॉल
            </h2>
            <div className="gold-divider mx-auto mb-6" />
            <p className="font-marathi text-[var(--muted)] text-lg leading-relaxed">
              गणपती बाप्पांच्या भक्तीसोबत सुंदर कलाकुसर आणि दर्जेदार मूर्ती आपल्या पर्यंत पोहोचवण्याचा आमचा प्रयत्न.
            </p>
            <p className="font-marathi text-[var(--muted)] mt-4 leading-relaxed">
              आमच्या स्टॉलवर आपल्याला घरगुती, मंडळासाठी आणि विविध आकारांमध्ये सुंदर गणपती मूर्ती मिळतील.
              छत्रपती शिवाजी महाराज चौक, चाळीसगाव येथे आम्ही सेवेत आहोत.
            </p>
          </div>
        </div>
      </section>

      {/* 12. Inquiry Form */}
      <section id="inquiry" className="py-16 bg-[var(--maroon)]">
        <div className="section-wrapper">
          <InquiryForm />
        </div>
      </section>

      {/* 13. Footer */}
      <Footer />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />
      <StickyMobileBar />
    </div>
  )
}
