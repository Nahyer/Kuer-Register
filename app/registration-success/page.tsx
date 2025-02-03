"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"

export default function RegistrationSuccess() {
  const searchParams = useSearchParams()
  const isUpdate = searchParams.get("isUpdate") === "true"

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">{isUpdate ? "Registration Updated" : "Registration Successful"}</h1>
      <p className="text-xl mb-8">
        {isUpdate
          ? "Your registration has been successfully updated. You will receive a confirmation email shortly."
          : "Thank you for registering. You will receive a confirmation email shortly."}
      </p>
      <Link href="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  )
}

