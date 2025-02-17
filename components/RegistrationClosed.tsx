import { Button } from "@/components/ui/button"
import Link from "next/link"

export function RegistrationClosed() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex items-center justify-center">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 text-primary">Registration Closed</h1>
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg mb-8">
          <p className="text-xl mb-4">We&apos;re sorry, but the registration period for KUER tournaments has ended.</p>
          <p className="text-lg">
            Thank you for your interest. Please check back later for information about future tournaments.
          </p>
        </div>
        <Link href="/">
          <Button className="bg-primary text-white font-bold py-3 px-6 rounded-full text-lg">Return to Home</Button>
        </Link>
      </div>
    </div>
  )
}

