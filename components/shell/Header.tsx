import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Resume Matcher</h1>
              <p className="text-sm text-gray-600">Compare resume ↔ job description with AI</p>
            </div>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
