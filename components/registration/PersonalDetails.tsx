import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCircle } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { FileUpload } from "@/components/FileUpload"
import { DatePicker } from "@/components/ui/date-picker"
import type { ReviewSubmitProps } from "./UniversityVerification"

export interface RegistrationFormData {
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: string
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
  passportPhoto: File | undefined
  passportPhotoName?: string
  passportPhotoPreview?: string
  discordScreenshot: File | undefined
  discordScreenshotName?: string
  discordScreenshotPreview?: string
  studentProof: File | undefined
  studentProofName?: string
  studentProofPreview?: string
  nationalId: File | undefined
  nationalIdName?: string
  nationalIdPreview?: string
  boardsiderScreenshot: File | undefined
  boardsiderScreenshotName?: string
  boardsiderScreenshotPreview?: string
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .optional(),
  lastName: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .optional(),
  gender: z.string({
    required_error: "Please select a gender.",
  }),
  dateOfBirth: z
    .date({
      required_error: "Please select a date of birth.",
    })
    .refine(
      (date) => {
        const age = new Date().getFullYear() - date.getFullYear()
        return age >= 18
      },
      {
        message: "You must be at least 18 years old to participate.",
      },
    ),
  passportPhoto: z.any().refine(
    (file) => {
      if (!file) return false
      if (file instanceof File) {
        return file.size <= MAX_FILE_SIZE
      }
      if (file instanceof Blob) {
        return file.size <= MAX_FILE_SIZE
      }
      return false
    },
    {
      message: `Max file size is 5MB.`,
    },
  ),
  passportPhotoPreview: z.string().optional(),
})

export default function PersonalDetails({ formData, updateFormData, nextStep, gameId }: ReviewSubmitProps) {
  const isFemaleOnly = gameId === "4" || gameId === "6" //EAFC 1v1 Women and Tekken Women
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      gender: isFemaleOnly ? "female" : formData.gender || "",
      dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
      passportPhoto: formData.passportPhoto || undefined,
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedValues = { ...values }
    if (values.dateOfBirth instanceof Date) {
      updatedValues.dateOfBirth = values.dateOfBirth
    }
    if (values.passportPhoto instanceof File || values.passportPhoto instanceof Blob) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updatedValues.passportPhotoPreview = reader.result as string
        updateFormData(updatedValues)
        nextStep()
      }
      reader.readAsDataURL(values.passportPhoto)
    } else {
      updateFormData(updatedValues)
      nextStep()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-center mb-6">
          <UserCircle className="w-12 h-12 text-primary" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              {isFemaleOnly ? (
                <Input value="Female" disabled className="bg-gray-100" />
              ) : (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <DatePicker date={field.value} setDate={field.onChange} />
              </FormControl>
              <FormDescription>You must be at least 18 years old to participate.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passportPhoto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passport Photo Upload</FormLabel>
              <FormControl>
                <FileUpload
                  field={field}
                  fieldName="passportPhoto"
                  accept={{ "image/*": [".jpeg", ".jpg", ".png"] }}
                  maxSize={MAX_FILE_SIZE}
                  updateFormData={updateFormData}
                  preview={formData.passportPhotoPreview}
                />
              </FormControl>
              <FormDescription>Upload a recent passport-style photo (JPG/PNG, max 5MB)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Next
        </Button>
      </form>
    </Form>
  )
}

