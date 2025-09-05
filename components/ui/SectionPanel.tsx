"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface SectionPanelProps {
  title: string
  content: string
  copyable?: boolean
}

export function SectionPanel({ title, content, copyable = false }: SectionPanelProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {copyable && (
          <Button variant="ghost" size="sm" onClick={copyToClipboard} className="text-gray-500 hover:text-gray-700">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        )}
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{content}</p>
      </div>
    </div>
  )
}
