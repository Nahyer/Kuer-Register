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
    has2v2Partner: string
    university: string
    branch: string
    course: string
    yearOfStudy: string
    confirmAccuracy: boolean
    agreeToRules: boolean
    passportPhoto: File 
    passportPhotoName?: string
    passportPhotoPreview?: string
    discordScreenshot: File 
    discordScreenshotName?: string
    discordScreenshotPreview?: string
    studentProof: File | Blob
    studentProofName?: string
    studentProofPreview?: string
    nationalId: File
    nationalIdName?: string
    nationalIdPreview?: string
    boardsiderScreenshot: File 
    boardsiderScreenshotName?: string
    boardsiderScreenshotPreview?: string
  }
  
  