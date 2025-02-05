export interface RegistrationFormData {
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: Date
  whatsapp: string
  email: string
  discordUsername: string
  inGameName: string
  inGameId: string
  boardsiderUsername: string
  hasTeam: string
  teamName: string
  playerRole: string
  isCaptain: string
  teamCaptainName: string
  has2v2Partner: "yes" | "no" | undefined
  university: string
  branch: string
  course: string
  yearOfStudy: string
  confirmAccuracy: boolean
  agreeToRules: boolean
  passportPhoto: File | Blob | null
  passportPhotoName?: string
  passportPhotoPreview?: string
  discordScreenshot: File | Blob | null
  discordScreenshotName?: string
  discordScreenshotPreview?: string
  studentProof: File | Blob | null
  studentProofName?: string
  studentProofPreview?: string
  nationalId: File | Blob | null
  nationalIdName?: string
  nationalIdPreview?: string
  boardsiderScreenshot: File | Blob | null
  boardsiderScreenshotName?: string
  boardsiderScreenshotPreview?: string
}