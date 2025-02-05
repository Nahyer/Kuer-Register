import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { SignInButton } from "@/components/SignInButton"
import { authOptions } from "@/lib/auth"

export default async function signin() {
  
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/select-game")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-primary">Sign in to your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            To participate in KUER tournaments, please sign in with your Google account.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <SignInButton />
        </div>
      </div>
    </div>
  )
}

