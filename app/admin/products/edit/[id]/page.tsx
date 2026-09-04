import { notFound } from 'next/navigation'
import Link from 'next/link'
import AdminSidebar from '@/components/AdminSidebar'
import ProductForm from '@/components/admin/ProductForm'
import { prisma } from '@/lib/prisma'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: { category: true },
  })

  if (!product) {
    notFound()
  }

  const initialData = {
    ...product,
    nameMarathi: product.nameMarathi || '',
    images: (() => {
      try {
        return JSON.parse(product.images || '[]')
      } catch {
        return []
      }
    })(),
    status: product.status as 'AVAILABLE' | 'BOOKED' | 'OUT_OF_STOCK',
  }

  return (
    <div className="flex min-h-screen bg-[var(--cream)]">
      <AdminSidebar activeSection="products" />
      <main className="flex-1 p-6 md:p-10 max-w-5xl">
        <div className="mb-6">
          <Link href="/admin/products" className="text-xs font-bold text-[var(--muted)] hover:text-[var(--maroon)] transition-colors">
            ← मूर्ती यादीवर परत जा
          </Link>
          <h1 className="font-marathi text-2xl md:text-3xl font-bold text-[var(--maroon)] mt-2">
            मूर्ती संपादित करा: {product.nameMarathi || product.name}
          </h1>
          <p className="text-xs text-[var(--muted)] mt-1">ID: {product.productId}</p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-stone-200 shadow-sm">
          <ProductForm isEdit={true} initialData={initialData} />
        </div>
      </main>
    </div>
  )
}
