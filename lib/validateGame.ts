"use server"

import db from "@/drizzle/src/db"
import { games } from "@/drizzle/src/db/schema"
import { eq } from "drizzle-orm"

export async function validateGameId(id: string) {
  const game = await db.query.games.findFirst({
    where: eq(games.id, Number.parseInt(id)),
  })
  return game !== null
}

