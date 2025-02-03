import { GameCard } from "@/components/GameCard"
import db from "@/drizzle/src/db"
import { games } from "@/drizzle/src/db/schema"
import { authOptions } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"


export default async function SelectGame() {
  const session = await getServerSession(authOptions)

  if(!session){
    redirect('/signin')
  }
  const gamesData = await db.query.games.findMany({
    where: eq(games.isActive, true),
  })

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Select Your Game</h1>
        <p className="text-xl text-center mb-12">Choose the game you want to register for:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gamesData.map((game) => (
            <GameCard key={game.id} game={{ ...game, imageUrl: game.imageUrl ?? '' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

