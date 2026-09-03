import { prisma } from '@/lib/prisma'
import AdminNav from '@/components/AdminNav'
import MurtiForm from '@/components/MurtiForm'
import { notFound } from 'next/navigation'

export default async function EditMurtiPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let murti: any = null
  try {
    murti = await prisma.murti.findUnique({ where: { id: parseInt(id) } })
  } catch (e) {}

  if (!murti) notFound()

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <AdminNav />
      <main className="max-w-2xl mx-auto px-4 md:px-6 py-8">

        {/* Page header */}
        <div className="mb-7">
          <p className="section-label mb-1">Admin — मूर्ती संपादन</p>
          <h1 className="text-3xl font-black text-stone-900">✏️ मूर्ती संपादित करा</h1>
          <p className="font-marathi text-stone-400 text-sm mt-1">
            {murti.nameMarathi || murti.name}
          </p>
        </div>

        <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-[6px_6px_0px_#D4B896] p-6 md:p-8">
          <MurtiForm
            isEdit
            initialData={{
              id:          murti.id,
              name:        murti.name,
              nameMarathi: murti.nameMarathi || '',
              description: murti.description || '',
              size:        murti.size,
              price:       murti.price.toString(),
              imageUrl:    murti.imageUrl,
              status:      murti.status,
            }}
          />
        </div>
      </main>
    </div>
  )
}
