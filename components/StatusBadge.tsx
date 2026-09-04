export default function StatusBadge({ status }: { status: string }) {
  if (status === 'AVAILABLE')  return <span className="badge-available">🟢 उपलब्ध</span>
  if (status === 'BOOKED')     return <span className="badge-booked">🟡 बुक केलेली</span>
  return <span className="badge-oos">🔴 उपलब्ध नाही</span>
}
