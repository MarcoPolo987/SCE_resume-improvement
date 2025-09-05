interface StatTileProps {
  title: string
  value: string
  className?: string
}

export function StatTile({ title, value, className = "" }: StatTileProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <div className={`text-2xl font-bold ${className}`}>{value}</div>
      <div className="text-sm text-gray-600 mt-1">{title}</div>
    </div>
  )
}
