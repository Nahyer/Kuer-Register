"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      const result = await signOut({
        redirect: false,
        callbackUrl: "/signin",
      })

      if (result?.url) {
        router.push(result.url)
      } else {
        // If no URL is returned, redirect to signin page
        router.push("/signin")
      }

      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
        variant: "default",
      })
    } catch (error) {
      console.error("Sign out error:", error)
      toast({
        title: "Sign Out Error",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      size="sm"
      className="bg-white/20 text-gray-800 border-gray-400 hover:bg-white/30 dark:bg-gray-800/20 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-800/30"
      disabled={isLoading}
    >
      {isLoading ? "Signing out..." : "Sign out"}
    </Button>
  )
}

