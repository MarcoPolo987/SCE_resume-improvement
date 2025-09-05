interface KeywordChipsProps {
  keywords: string[]
  variant: "matched" | "missing"
}

export function KeywordChips({ keywords, variant }: KeywordChipsProps) {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
  const variantClasses = variant === "matched" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"

  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword, index) => (
        <span key={index} className={`${baseClasses} ${variantClasses}`}>
          {keyword}
        </span>
      ))}
    </div>
  )
}
