import { boolean, timestamp, pgTable, text, primaryKey, integer, serial, varchar, date } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import type { AdapterAccount } from "next-auth/adapters"


export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
)
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
)

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
)


export const registrations = pgTable("registration", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  gameId: integer("game_id").notNull().references(()=> games.id, { onDelete: "cascade" }),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  gender: varchar("gender", { length: 50 }).notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  whatsapp: varchar("whatsapp", { length: 50 }).notNull(),
  discordUsername: varchar("discord_username", { length: 255 }).notNull(),
  university: varchar("university", { length: 255 }).notNull(),
  course: varchar("course", { length: 255 }).notNull(),
  yearOfStudy: varchar("year_of_study", { length: 50 }).notNull(),
  passportPhotoUrl: text("passport_photo_url").notNull(),
  discordScreenshotUrl: text("discord_screenshot_url").notNull(),
  studentProofUrl: text("student_proof_url").notNull(),
  nationalIdUrl: text("national_id_url").notNull(),
  inGameName: varchar("in_game_name", { length: 255 }),
  inGameId: varchar("in_game_id", { length: 255 }),
  boardsiderUsername: varchar("boardsider_username", { length: 255 }),
  hasTeam: boolean("has_team"),
  teamName: varchar("team_name", { length: 255 }),
  playerRole: varchar("player_role", { length: 50 }),
  isCaptain: boolean("is_captain"),
  teamCaptainName: varchar("team_captain_name", { length: 255 }),
  has2v2Partner: boolean("has_2v2_partner"),
  createdAt: timestamp("created_at").defaultNow(),
  email: varchar("email", { length: 255 }).notNull(),
  branch: varchar("branch", { length: 255 }),
  boardsiderScreenshotUrl: text("boardsider_screenshot_url"),
})

export const registrationsRelations = relations(registrations, ({ one }) => ({
  user: one(users, {
    fields: [registrations.userId],
    references: [users.id],
  }),
}))

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
})

export const gamesRelations = relations(games, ({ many }) => ({
  registrations: many(registrations),
}))

