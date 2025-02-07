"use client"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useMediaQuery } from "@/hooks/useMediaQuery"

export function MobileNotification() {
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    if (isMobile) {
      const hasBeenDismissed = localStorage.getItem("mobileNotificationDismissed")
      if (!hasBeenDismissed) {
        setIsVisible(true)
      }
    }
  }, [isMobile])

  const dismissNotification = () => {
    setIsVisible(false)
    localStorage.setItem("mobileNotificationDismissed", "true")
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-x-0 top-0 z-50 p-4 bg-yellow-100 text-yellow-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm font-medium">
          For the best experience and to avoid potential upload issues, please use a laptop or desktop computer to
          browse this site and complete any forms.
        </p>
        <button
          onClick={dismissNotification}
          className="ml-4 text-yellow-600 hover:text-yellow-800"
          aria-label="Dismiss notification"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  )
}

