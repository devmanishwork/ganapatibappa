import AdminNav from '@/components/AdminNav'
import MurtiForm from '@/components/MurtiForm'

export default function AddMurtiPage() {
  return (
    <div className="min-h-screen bg-orange-50">
      <AdminNav />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 md:p-8">
          <h1 className="text-2xl font-bold text-orange-800 mb-2">➕ नवीन मूर्ती जोडा</h1>
          <p className="text-gray-500 text-sm mb-6">Add New Ganapati Murti</p>
          <hr className="border-orange-100 mb-6" />
          <MurtiForm />
        </div>
      </main>
    </div>
  )
}
