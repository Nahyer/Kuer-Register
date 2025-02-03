"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { GameRulesModal } from "./GameRulesModal"

interface Game {
  id: number
  name: string
  fullName: string
  imageUrl: string
}

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Card
        className="w-full h-64 cursor-pointer transition-transform hover:scale-105 overflow-hidden relative group"
        onClick={handleClick}
      >
        <Image
          src={game.imageUrl || "/placeholder.svg"}
          alt={game.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
        <CardContent className="p-4 absolute bottom-0 left-0 right-0">
          <div className="bg-primary/80 text-primary-foreground px-2 py-1 rounded-md inline-block">
            <h2 className="text-sm font-bold">{game.name}</h2>
          </div>
          <p className="text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {game.fullName}
          </p>
        </CardContent>
      </Card>
      <GameRulesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gameId={game.id.toString()}
        gameName={game.fullName}
      />
    </>
  )
}

