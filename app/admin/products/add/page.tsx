import Link from 'next/link'
import AdminSidebar from '@/components/AdminSidebar'
import ProductForm from '@/components/admin/ProductForm'

export default function AddProductPage() {
  return (
    <div className="flex min-h-screen bg-[var(--cream)]">
      <AdminSidebar activeSection="products" />
      <main className="flex-1 p-6 md:p-10 max-w-5xl">
        <div className="mb-6">
          <Link href="/admin/products" className="text-xs font-bold text-[var(--muted)] hover:text-[var(--maroon)] transition-colors">
            ← मूर्ती यादीवर परत जा
          </Link>
          <h1 className="font-marathi text-2xl md:text-3xl font-bold text-[var(--maroon)] mt-2">
            नवीन मूर्ती जोडा
          </h1>
          <p className="font-marathi text-xs text-[var(--muted)] mt-1">
            स्टॉलवरील नवीन गणपती मूर्तीचे फोटो, आकार आणि किंमत नोंदवा.
          </p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-stone-200 shadow-sm">
          <ProductForm isEdit={false} />
        </div>
      </main>
    </div>
  )
}
