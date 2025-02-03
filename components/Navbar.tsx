"use client"

import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useScrollPosition } from "@/hooks/useScrollPosition"
import { SignOutButton } from "./SignOutButton"

export function Navbar() {
  const { data: session } = useSession()
  const scrollPosition = useScrollPosition()

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollPosition > 0 ? "bg-background/70 backdrop-filter backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${scrollPosition > 0 ? "bg-background/30" : ""}`}>
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KUER%20transparent-ADWTe637irf50TF7gvZ0Xc3edWtDMY.png"
              alt="KUER Logo"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-primary sr-only">KUER</span>
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {session ? (
              <>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Welcome, {session.user?.name}
                </span>
                <SignOutButton />
              </>
            ) : (
              <Link href="/signin">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 text-gray-800 border-gray-400 hover:bg-white/30 dark:bg-gray-800/20 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-800/30"
                >
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

