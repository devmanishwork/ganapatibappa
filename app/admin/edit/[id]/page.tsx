import { prisma } from '@/lib/prisma'
import AdminNav from '@/components/AdminNav'
import MurtiForm from '@/components/MurtiForm'
import { notFound } from 'next/navigation'

export default async function EditMurtiPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let murti: any = null
  try {
    murti = await prisma.murti.findUnique({
      where: { id: parseInt(id) },
    })
  } catch (e) {}

  if (!murti) notFound()

  return (
    <div className="min-h-screen bg-orange-50">
      <AdminNav />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 md:p-8">
          <h1 className="text-2xl font-bold text-orange-800 mb-2">✏️ मूर्ती संपादित करा</h1>
          <p className="text-gray-500 text-sm mb-6">Edit Murti — {murti.nameMarathi || murti.name}</p>
          <hr className="border-orange-100 mb-6" />
          <MurtiForm
            isEdit
            initialData={{
              id: murti.id,
              name: murti.name,
              nameMarathi: murti.nameMarathi || '',
              description: murti.description || '',
              size: murti.size,
              price: murti.price.toString(),
              imageUrl: murti.imageUrl,
              status: murti.status,
            }}
          />
        </div>
      </main>
    </div>
  )
}
