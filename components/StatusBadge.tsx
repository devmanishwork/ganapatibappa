import { CheckCircle2, Bookmark, XCircle } from 'lucide-react'

export default function StatusBadge({ status }: { status: string }) {
  if (status === 'AVAILABLE') {
    return (
      <span className="badge-available inline-flex items-center gap-1.5 font-marathi">
        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
        <span>उपलब्ध</span>
      </span>
    )
  }

  if (status === 'BOOKED') {
    return (
      <span className="badge-booked inline-flex items-center gap-1.5 font-marathi">
        <Bookmark className="w-3 h-3 text-amber-700" />
        <span>बुक केलेली</span>
      </span>
    )
  }

  return (
    <span className="badge-oos inline-flex items-center gap-1.5 font-marathi">
      <XCircle className="w-3 h-3 text-rose-700" />
      <span>उपलब्ध नाही</span>
    </span>
  )
}
