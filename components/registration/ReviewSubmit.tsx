"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import { useRouter } from "next/navigation"
import type React from "react"
import { submitRegistration } from "@/app/actions/submit-registration/submit-registration"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import type { RegistrationFormData } from "@/types/registration"
import { uploadToBlob } from "@/lib/azureStorage"
import { LoadingSpinner } from "../LoadingSpinner"

export interface ReviewSubmitProps {
  formData: RegistrationFormData
  updateFormData: (data: Partial<RegistrationFormData>) => void
  prevStep: () => void
  gameId: string
}

export default function ReviewSubmit({ formData, updateFormData, prevStep, gameId }: ReviewSubmitProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.confirmAccuracy || !formData.agreeToRules) {
      return
    }

    setIsSubmitting(true)
    window.scrollTo(0, 0)

    try {
      const uploadFile = async (file: File | Blob | null, fieldName: string) => {
        if (!file) return null
        const fullName = `${formData.firstName} ${formData.lastName}`.trim()
        const fileName = `${fullName}_${fieldName}_${Date.now()}_${file instanceof File ? file.name : "blob"}`
        return await uploadToBlob(file, fileName)
      }

      const [passportPhotoUrl, discordScreenshotUrl, studentProofUrl, nationalIdUrl, boardsiderScreenshotUrl] =
        await Promise.all([
          uploadFile(formData.passportPhoto, "passportPhoto"),
          uploadFile(formData.discordScreenshot, "discordScreenshot"),
          uploadFile(formData.studentProof, "studentProof"),
          uploadFile(formData.nationalId, "nationalId"),
          formData.boardsiderScreenshot ? uploadFile(formData.boardsiderScreenshot, "boardsiderScreenshot") : null,
        ])

      // Create FormData object
      const submitFormData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File || value instanceof Blob) return // Skip file fields
        submitFormData.append(key, value as string)
      })

      // Add file URLs and gameId
      submitFormData.append("passportPhotoUrl", passportPhotoUrl!)
      submitFormData.append("discordScreenshotUrl", discordScreenshotUrl!)
      submitFormData.append("studentProofUrl", studentProofUrl!)
      submitFormData.append("nationalIdUrl", nationalIdUrl!)
      if (boardsiderScreenshotUrl) {
        submitFormData.append("boardsiderScreenshotUrl", boardsiderScreenshotUrl)
      }
      submitFormData.append("gameId", gameId)

      // Submit the form
      const result = await submitRegistration(submitFormData)

      if (result.success) {
        // Show success toast with different messages for new registration and update
        toast({
          title: result.isUpdate ? "Registration Updated" : "Registration Successful",
          description: result.isUpdate
            ? "Your registration has been successfully updated."
            : "Your registration has been successfully submitted.",
          variant: "default",
        })

        // Redirect to success page with isUpdate parameter
        router.push(`/registration-success?isUpdate=${result.isUpdate}`)
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error("Registration error:", error)
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Upload cancelled")
        toast({
          title: "Upload Cancelled",
          description: "The file upload was cancelled.",
          variant: "default",
        })
      } else {
        let errorMessage = "There was an error submitting your registration. Please try again."
        if (error instanceof Error) {
          errorMessage = error.message
        }
        toast({
          title: "Registration Failed",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const isEAFC2v2Open = gameId === "3" // EAFC 2v2 Open
  const isPUBGM = gameId === "2" // PUBGM
  const isCODM = gameId === "1" // CODM

  const getTournamentRulesLink = (gameId: string) => {
    switch (gameId) {
      case "1": // CODM BR
        return "https://drive.google.com/file/d/1xtwCIuW7uGkjRvM9Odt0h4mbSuo6GuzT/view?usp=drive_link"
      case "2": // PUBGM
        return "https://drive.google.com/file/d/1NNsdKOKa4H2m-BoSXG301--ek34mD9rS/view?usp=drive_link"
      case "3": // EAFC 2v2 Open
      case "4": // EAFC 1v1 Women
        return "https://drive.google.com/file/d/1Ed4F-jZC_d5h4K6sw4U1PnpcxnceKvdl/view?usp=sharing"
      default: // CODM MP (assuming this is the default case)
        return "https://drive.google.com/file/d/1hOR4PBMK5u0H6RmbHOVDUhCEofJkmOVE/view?usp=drive_link"
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-center mb-6">
        <CheckCircle className="w-12 h-12 text-primary" />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Review Your Information</h2>
        <div className="space-y-2">
          <h3 className="font-semibold">Personal Info</h3>
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p>
              Name: {formData.firstName} {formData.lastName}
            </p>
            <p>Gender: {formData.gender}</p>
            <p>
              Date of Birth: {formData.dateOfBirth ? format(new Date(formData.dateOfBirth), "PPP") : "Not provided"}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Contact & Gaming Info</h3>
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p>WhatsApp: {formData.whatsapp || "Not provided"}</p>
            <p>Discord: {formData.discordUsername || "Not provided"}</p>
            {(isCODM || isPUBGM) && (
              <>
                <p>In-Game Name: {formData.inGameName || "Not provided"}</p>
                <p>In-Game ID: {formData.inGameId || "Not provided"}</p>
                <p>Boardsider Username: {formData.boardsiderUsername || "Not provided"}</p>
                <p>Has Team: {formData.hasTeam === "yes" ? "Yes" : "No"}</p>
                {formData.hasTeam === "yes" && (
                  <>
                    <p>Team Name: {formData.teamName || "Not provided"}</p>
                    <p>Player Role: {formData.playerRole === "main" ? "Main Player" : "Substitute"}</p>
                    <p>Team Captain: {formData.isCaptain === "yes" ? "Yes" : "No"}</p>
                    {formData.isCaptain === "no" && (
                      <p>Team Captain s Name: {formData.teamCaptainName || "Not provided"}</p>
                    )}
                  </>
                )}
              </>
            )}
            {isEAFC2v2Open && (
              <>
                <p>Has 2v2 Partner: {formData.has2v2Partner === "yes" ? "Yes" : "No"}</p>
                {formData.has2v2Partner === "yes" && (
                  <>
                    <p>Team Name: {formData.teamName || "Not provided"}</p>
                    <p>Team Captain: {formData.isCaptain === "yes" ? "Yes" : "No"}</p>
                    {formData.isCaptain === "no" && (
                      <p>Team Captain s Name: {formData.teamCaptainName || "Not provided"}</p>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">University Details</h3>
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p>University: {formData.university || "Not provided"}</p>
            <p>Branch: {formData.branch || "Not provided"}</p>
            <p>Course: {formData.course || "Not provided"}</p>
            <p>Year of Study: {formData.yearOfStudy || "Not provided"}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="confirmAccuracy"
            checked={formData.confirmAccuracy}
            onCheckedChange={(checked) => updateFormData({ confirmAccuracy: checked === true })}
          />
          <Label htmlFor="confirmAccuracy">I confirm all information is accurate</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeToRules"
            checked={formData.agreeToRules}
            onCheckedChange={(checked) => updateFormData({ agreeToRules: checked === true })}
          />
          <Label htmlFor="agreeToRules">
            I agree to the{" "}
            <a
              href={getTournamentRulesLink(gameId)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              tournament rules
            </a>
          </Label>
        </div>

        <div className="text-sm text-muted-foreground">
          By participating in KUER, you automatically agree to the{" "}
          <Dialog>
            <DialogTrigger asChild>
              <span className="text-primary hover:underline cursor-pointer">terms and conditions</span>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Kenya University Esports Rankings (KUER) Terms and Conditions</DialogTitle>
                <DialogDescription>
                  <div className="space-y-6 mt-4">
                    <section>
                      <h2 className="text-xl font-bold">1. Eligibility</h2>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>
                          Participants <strong>must be registered university students in Kenya</strong>.
                        </li>
                        <li>
                          Players <strong>must provide valid identification</strong>, including:
                          <ul className="list-disc pl-5">
                            <li>
                              <strong>Student ID or admission letter</strong>
                            </li>
                            <li>
                              <strong>National ID</strong>
                            </li>
                            <li>
                              <strong>Passport photo</strong> (for verification)
                            </li>
                          </ul>
                        </li>
                        <li>
                          Players must provide requested details to help KUER run tournaments{" "}
                          <strong>smoothly and effectively</strong>.
                        </li>
                      </ol>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold">2. Participation and Conduct</h2>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>
                          Players <strong>must adhere to KUER s competition rules</strong> and guidelines for{" "}
                          <strong>fair play</strong>.
                        </li>
                        <li>
                          <strong>Cheating, hacking, or exploiting in-game bugs</strong> will result in{" "}
                          <strong>disqualification</strong>.
                        </li>
                        <li>
                          <strong>Unsportsmanlike behavior</strong> (harassment, discrimination, toxicity){" "}
                          <strong>will not be tolerated</strong>.
                        </li>
                        <li>
                          Participants{" "}
                          <strong>must respect tournament administrators, referees, and fellow competitors</strong>.
                        </li>
                        <li>
                          Players <strong>must be punctual</strong> and plan ahead, especially for{" "}
                          <strong>LAN events</strong>. If a player{" "}
                          <strong>cannot attend a required physical event, they should not register</strong>.
                        </li>
                      </ol>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold">3. Prize Payments</h2>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>
                          If cash prizes apply, <strong>KUER has up to 30 days</strong> after the tournament to process
                          and distribute payments.
                        </li>
                        <li>
                          Payments will be made <strong>via the agreed-upon method</strong> communicated before the
                          tournament.
                        </li>
                        <li>
                          <strong>Players must provide correct payment details</strong>. KUER is{" "}
                          <strong>not responsible</strong> for issues due to incorrect information.
                        </li>
                        <li>
                          <strong>Violation of KUER rules</strong> may result in <strong>forfeiture of prizes</strong>.
                        </li>
                      </ol>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold">4. Use of Player Content</h2>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>
                          By participating, players <strong>grant KUER permission</strong> to use their:
                          <ul className="list-disc pl-5">
                            <li>
                              <strong>Photos and videos</strong>
                            </li>
                            <li>
                              <strong>In-game footage</strong>
                            </li>
                            <li>
                              <strong>Related content</strong> for{" "}
                              <strong>marketing, promotions, and content creation</strong>.
                            </li>
                          </ul>
                        </li>
                        <li>
                          KUER <strong>may publish this content</strong> on its website, social media, and other media
                          platforms <strong>without additional consent or compensation</strong>.
                        </li>
                      </ol>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold">5. Streaming and Media Rights</h2>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>
                          <strong>KUER reserves the right to stream, record, and distribute</strong> gameplay and
                          competition footage.
                        </li>
                        <li>
                          <strong>Players who wish to stream their matches must obtain prior approval</strong> from KUER
                          and follow branding guidelines.
                        </li>
                        <li>
                          <strong>Unauthorized third-party broadcasting or monetization</strong> of KUER events{" "}
                          <strong>is prohibited</strong>.
                        </li>
                      </ol>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold">6. Team and Player Responsibilities</h2>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>
                          Teams <strong>must register their rosters</strong> before the tournament deadline.
                        </li>
                        <li>
                          <strong>Roster changes</strong> must be communicated <strong>in advance</strong> to KUER
                          officials.
                        </li>
                        <li>
                          Players <strong>are responsible</strong> for having a{" "}
                          <strong>stable internet connection and necessary gaming equipment</strong>.
                        </li>
                        <li>
                          KUER <strong>is not liable for technical issues</strong> on the player s end, including
                          connectivity problems or hardware failures.
                        </li>
                      </ol>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold">7. Disciplinary Actions</h2>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>
                          KUER <strong>reserves the right</strong> to take disciplinary action, including:
                          <ul className="list-disc pl-5">
                            <li>
                              <strong>Warnings</strong>
                            </li>
                            <li>
                              <strong>Suspensions</strong>
                            </li>
                            <li>
                              <strong>Permanent bans</strong> for rule violations.
                            </li>
                          </ul>
                        </li>
                        <li>
                          Appeals <strong>must be submitted in writing</strong> to KUER <strong>within 48 hours</strong>{" "}
                          of disciplinary action.
                        </li>
                      </ol>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold">8. Amendments and Updates</h2>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>
                          KUER <strong>reserves the right to update</strong> these terms and conditions at any time.
                        </li>
                        <li>
                          Any changes will be{" "}
                          <strong>communicated via KUER s official website and social media channels</strong>.
                        </li>
                      </ol>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold">Agreement</h2>
                      <p>
                        By participating in KUER, <strong>all players acknowledge and agree</strong> to abide by these
                        Terms and Conditions.
                      </p>
                    </section>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" onClick={prevStep} variant="outline" disabled={isSubmitting}>
          Previous
        </Button>
        
        <Button type="submit" disabled={isSubmitting || !formData.confirmAccuracy || !formData.agreeToRules}>
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </Button>
      </div>
	  {isSubmitting && <LoadingSpinner/>}
    </form>
  )
}

