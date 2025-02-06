"use server"

import { sendConfirmationEmail } from "@/lib/email"
import { games, registrations, users } from "@/drizzle/src/db/schema"
import { getServerSession } from "next-auth/next"
import db from "@/drizzle/src/db"
import { authOptions } from "@/lib/auth"
import { and, eq } from "drizzle-orm"


export async function submitRegistration(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    throw new Error("You must be signed in to register")
  }

  // Fetch the user record from the database
  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email!),
  })

  if (!user) {
    throw new Error("User not found in the database")
  }
  
  // Extract form data
  const gameId = Number.parseInt(formData.get("gameId") as string)

  // Check if the user has already registered for this game
  const existingRegistration = await db.query.registrations.findFirst({
    where: and(eq(registrations.userId, user.id), eq(registrations.gameId, gameId)),
  })

  if (existingRegistration) {
    throw new Error("You have already registered for this game")
  }

  // Extract form data
  
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = session.user.email! // Use email from session
  const dateOfBirth = new Date(formData.get("dateOfBirth") as string)
  const gender = formData.get("gender") as string
  const whatsapp = formData.get("whatsapp") as string
  const discordUsername = formData.get("discordUsername") as string
  const university = formData.get("university") as string
  const course = formData.get("course") as string
  const yearOfStudy = formData.get("yearOfStudy") as string

  // Get file URLs directly from formData
  const passportPhotoUrl = formData.get("passportPhotoUrl") as string
  const discordScreenshotUrl = formData.get("discordScreenshotUrl") as string
  const studentProofUrl = formData.get("studentProofUrl") as string
  const nationalIdUrl = formData.get("nationalIdUrl") as string
  const boardsiderScreenshotUrl = formData.get("boardsiderScreenshotUrl") as string

  // Additional game-specific fields
  const inGameName = formData.get("inGameName") as string
  const inGameId = formData.get("inGameId") as string
  const boardsiderUsername = formData.get("boardsiderUsername") as string
  const hasTeam = formData.get("hasTeam") === "yes"
  const teamName = formData.get("teamName") as string
  const playerRole = formData.get("playerRole") as string
  const isCaptain = formData.get("isCaptain") === "yes"
  const teamCaptainName = formData.get("teamCaptainName") as string
  const has2v2Partner = formData.get("has2v2Partner") === "yes"
  const branch = formData.get("branch") as string

  try {
    // Attempt to insert the registration data
    const result = await db
      .insert(registrations)
      .values({
        userId: user.id,
        gameId,
        firstName,
        lastName,
        gender,
        dateOfBirth: dateOfBirth.toISOString(),
        whatsapp,
        discordUsername,
        university,
        course,
        yearOfStudy,
        passportPhotoUrl,
        discordScreenshotUrl,
        studentProofUrl,
        nationalIdUrl,
        inGameName,
        inGameId,
        boardsiderUsername,
        hasTeam,
        teamName,
        playerRole,
        isCaptain,
        teamCaptainName,
        has2v2Partner,
        email,
        branch,
        boardsiderScreenshotUrl,
      })
      // .onConflictDoUpdate({
      //   target: [registrations.userId, registrations.gameId],
      //   set: {
      //     firstName,
      //     lastName,
      //     gender,
      //     dateOfBirth: dateOfBirth.toISOString(),
      //     whatsapp,
      //     discordUsername,
      //     university,
      //     course,
      //     yearOfStudy,
      //     passportPhotoUrl,
      //     discordScreenshotUrl,
      //     studentProofUrl,
      //     nationalIdUrl,
      //     inGameName,
      //     inGameId,
      //     boardsiderUsername,
      //     hasTeam,
      //     teamName,
      //     playerRole,
      //     isCaptain,
      //     teamCaptainName,
      //     has2v2Partner,
      //     email,
      //     branch,
      //     boardsiderScreenshotUrl,
      //   },
      // })

    // Get the game name based on the gameId
    const game = await db.query.games.findFirst({
      where: (games, { eq }) => eq(games.id, gameId),
    })

    if (!game) {
      throw new Error("Game not found")
    }

    // Send confirmation email
    await sendConfirmationEmail(email, `${firstName} ${lastName}`, game.fullName)

    // Revalidate the cache for the user's profile page
    // revalidatePath(`/profile/${user.id}`)

    // Check if it was an insert or update
    const isUpdate = result.rowCount === 0

    // Return a success message
    return {
      success: true,
      message: isUpdate ? "Registration updated successfully" : "Registration submitted successfully",
      isUpdate,
    }
  } catch (error) {
    console.error("Registration error:", error)
    throw new Error("Failed to submit registration. Please try again.")
  }
}

export async function validateGameId(id: string) {
  const game = await db.query.games.findFirst({
    where: eq(games.id, Number.parseInt(id)),
  })
  return game !== null
}


