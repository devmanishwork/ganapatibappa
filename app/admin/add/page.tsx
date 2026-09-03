import AdminNav from '@/components/AdminNav'
import MurtiForm from '@/components/MurtiForm'

export default function AddMurtiPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <AdminNav />
      <main className="max-w-2xl mx-auto px-4 md:px-6 py-8">

        {/* Page header */}
        <div className="mb-7">
          <p className="section-label mb-1">Admin — मूर्ती व्यवस्थापन</p>
          <h1 className="text-3xl font-black text-stone-900">➕ नवीन मूर्ती जोडा</h1>
          <p className="text-stone-400 text-sm mt-1">Add a new Ganapati murti to the catalog</p>
        </div>

        <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-[6px_6px_0px_#D4B896] p-6 md:p-8">
          <MurtiForm />
        </div>
      </main>
    </div>
  )
}
