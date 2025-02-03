import db from "."
import { games } from "./schema"


const seedGames = async () => {
  const gamesData = [
    {
      id: 1,
      name: "CODM",
      fullName: "Call of Duty: Mobile",
      imageUrl: "https://res.cloudinary.com/djeyyn3yi/image/upload/v1737567671/images_1_tlq3db.jpg",
    },
    {
      id: 2,
      name: "PUBGM",
      fullName: "PlayerUnknown's Battlegrounds Mobile",
      imageUrl:
        "https://res.cloudinary.com/djeyyn3yi/image/upload/v1737567631/SADG6MgH-PUBGMobile-1-1-1200x675_zngfay.jpg",
    },
    {
      id: 3,
      name: "EAFC 2v2 Open",
      fullName: "EA FC 24 2v2 Open Tournament",
      imageUrl: "https://res.cloudinary.com/djeyyn3yi/image/upload/v1737567704/images_itm6lv.jpg",
    },
    {
      id: 4,
      name: "EAFC 1v1 Women",
      fullName: "EA FC 24 1v1 Women's Tournament",
      imageUrl: "https://res.cloudinary.com/djeyyn3yi/image/upload/v1737567621/channels4_profile_1_xxuttt.jpg",
    },
    {
      id: 5,
      name: "Tekken Open",
      fullName: "Tekken 8 Open Tournament",
      imageUrl:
        "https://res.cloudinary.com/djeyyn3yi/image/upload/v1737567684/Karakter-Tekken-Ikonik-Featured-750x375_qdcdkn.jpg",
    },
    {
      id: 6,
      name: "Tekken Women",
      fullName: "Tekken 8 Women's Tournament",
      imageUrl:
        "https://res.cloudinary.com/djeyyn3yi/image/upload/v1737567684/Karakter-Tekken-Ikonik-Featured-750x375_qdcdkn.jpg",
    },
  ]

  console.log("Seeding games table...")

  
  for (const game of gamesData) {
    await db.insert(games)
      .values(game)
      .onConflictDoUpdate({
        target: [games.id],
        set: {
          name: game.name,
          fullName: game.fullName,
          imageUrl: game.imageUrl,
        },
      })
    console.log(`Upserted: ${game.fullName}`)
  }

  console.log("Games table seeded successfully.")
}


const runSeed = async () => {
  try {
    await seedGames()
    console.log("All seeds completed successfully.")
  } catch (error) {
    console.error("Error during seeding:", error)
  } finally {
    process.exit(0)
  }
}

runSeed().catch((err) => {
  console.error(err)
  process.exit(1)
})

