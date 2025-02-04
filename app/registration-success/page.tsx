"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { Orbitron } from "next/font/google"
const orbitron = Orbitron({ subsets: ["latin"] })
export default function RegistrationSuccess() {
  const searchParams = useSearchParams()
  const isUpdate = searchParams.get("isUpdate") === "true"

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
        <div className="w-full max-w-lg text-center space-y-6">
          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${orbitron.className} bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text`}
          >
            Registration Successful
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-muted-foreground">
            {isUpdate
              ? "Your registration has been successfully updated. You will receive a confirmation email shortly."
              : "Thank you for registering. You will receive a confirmation email shortly."}
          </p>
          <Link href={`/select-game`}>
            <Button className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Return to Games
            </Button>
          </Link>
        </div>
      </div>
  )
}

