"use client"

import { signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function SignInButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handlesignin = async () => {
    try {
      setIsLoading(true)
      const result = await signIn("google", {
        callbackUrl: "/",
        redirect: false,
      })

      if (result?.error) {
        toast({
          title: "Authentication Error",
          description: "There was a problem signing in. Please try again.",
          variant: "destructive",
        })
      } else if (result?.ok) {
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Authentication Error",
        description: "There was a problem signing in. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handlesignin} className="w-full flex items-center justify-center gap-2" disabled={isLoading}>
      <FcGoogle className="w-5 h-5" />
      {isLoading ? "signing in..." : "Sign in with Google"}
    </Button>
  )
}

export function SignOutButton() {
  return (
    <Button onClick={() => signOut()} variant="outline" size="sm">
      Sign out
    </Button>
  )
}
