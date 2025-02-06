"use client"

import { useTheme } from "next-themes"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
interface LoadingSpinnerProps {
  isSubmitting?: boolean
  uploadProgress?: number
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = () => {
  const { theme } = useTheme()
  // Ensure the component renders after theme is loaded
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // When in light theme, use a darker overlay; adjust for dark theme as needed
  const overlayClass = theme === "light" ? "bg-black/50" : "bg-black/30"

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${overlayClass}`}>
      <Loader2 className="w-6 h-6 text-white animate-spin" />
      {/* {isSubmitting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-background p-4 rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-foreground">Uploading: {Math.round(uploadProgress)}%</p>
          </div>
        </div>
      )} */}
    </div>
  )
}