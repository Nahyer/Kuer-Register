"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import PersonalDetails from "@/components/registration/PersonalDetails"
import ContactGamingInfo from "@/components/registration/ContactGamingInfo"
import UniversityVerification from "@/components/registration/UniversityVerification"
import IDVerification from "@/components/registration/IDVerification"
import ReviewSubmit from "@/components/registration/ReviewSubmit"
import ProgressBar from "@/components/ProgressBar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { RegistrationFormData } from "@/types/registration"
import { validateGameId } from "../actions/submit-registration/submit-registration"





const steps = [
  "Personal Details",
  "Contact & Gaming Info",
  "University Verification",
  "ID Verification",
  "Review & Submit",
]

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<RegistrationFormData>({} as RegistrationFormData)
  const [gameId, setGameId] = useState<string | null>(null)
  const [gameName, setGameName] = useState<string | null>(null)
  const router = useRouter()
  const isSmallScreen = useMediaQuery("(max-width: 640px)")
  
  useEffect(() => {
    const storedGame = sessionStorage.getItem("selectedGame")
 
    if (storedGame) {
      const { id, name } = JSON.parse(storedGame)
      validateGameId(id).then((isValid) => {
        if (isValid) {
          setGameId(id)
          setGameName(name)
        } else {
          console.error("Invalid game ID")
          router.push("/select-game")
        }
      })
    } else {
      console.error("Invalid game ID")
      router.push("/select-game")
    }
  }, [router])


  const updateFormData = (stepData: Partial<RegistrationFormData>) => {
    setFormData((prevData) => {
      const newData = { ...prevData, ...stepData }
      // Preserve file information
      if (stepData.passportPhoto instanceof File) {
        newData.passportPhotoName = stepData.passportPhoto.name
      }
      if (stepData.discordScreenshot instanceof File) {
        newData.discordScreenshotName = stepData.discordScreenshot.name
      }
      if (stepData.studentProof instanceof File) {
        newData.studentProofName = stepData.studentProof.name
      }
      if (stepData.nationalId instanceof File) {
        newData.nationalIdName = stepData.nationalId.name
      }
      if (stepData.boardsiderScreenshot instanceof File) {
        newData.boardsiderScreenshotName = stepData.boardsiderScreenshot.name
      }
      return newData
    })
  }

  const nextStep = () => {
    setCurrentStep((prev) => {
      const newStep = Math.min(prev + 1, steps.length)
      return newStep
    })
  }
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDetails formData={formData} updateFormData={updateFormData} nextStep={nextStep} gameId={gameId} />
      case 2:
        return (
          <ContactGamingInfo
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            gameId={gameId!}
          />
        )
      case 3:
        return (
          <UniversityVerification
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )
      case 4:
        return (
          <IDVerification formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
        )
      case 5:
        return <ReviewSubmit formData={formData} updateFormData={updateFormData} prevStep={prevStep} gameId={gameId!} />
      default:
        return null
    }
  }
  const handleBackToGames = () => {
    router.push("/select-game")
  }

  if (!gameId || !gameName) {
    return null // or a loading state
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className={`max-w-2xl mx-auto ${isSmallScreen ? "px-4" : ""}`}>
        <Button variant="ghost" size="sm" className="mb-6" onClick={handleBackToGames}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Games
        </Button>
        <h1 className="text-3xl font-bold text-primary text-center mb-6">
          {gameName ? `${gameName} Registration` : "KUER Tournament Registration"}
        </h1>
        <ProgressBar steps={steps} currentStep={currentStep} />
        <Card className="mt-6">
          <CardContent className="p-6">{renderStep()}</CardContent>
        </Card>
      </div>
    </div>
  )
}
