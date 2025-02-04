import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { FileUpload } from "@/components/FileUpload"
import { RegistrationFormData } from "@/types/registration"

// const universities = [
//   "University of Nairobi",
//   "Kenyatta University",
//   "Strathmore University",
//   "Jomo Kenyatta University of Agriculture and Technology",
//   "Moi University",
//   // Add more universities as needed
// ]

const formSchema = z.object({
  university: z.string().min(1, "University name is required"),
  branch: z.string().optional(),
  course: z.string().min(1, "Course is required"),
  yearOfStudy: z.string({
    required_error: "Please select your year of study.",
  }),
  studentProof: z
  .any()
  .refine(
    (file) => file instanceof File || file instanceof Blob || typeof file === "undefined",
    "Student proof is required",
  )
    .refine((file) => {
      if (file instanceof File || file instanceof Blob) {
        return file.size <= MAX_FILE_SIZE
      }
      return true
    }, `Max file size is 10MB.`),
})

export interface ReviewSubmitProps {
  formData: RegistrationFormData
  updateFormData: (data: Partial<RegistrationFormData>) => void
  prevStep?: () => void
  nextStep: () => void
  gameId?: string | null
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export default function UniversityVerification({ formData, updateFormData, prevStep, nextStep }: ReviewSubmitProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      university: formData.university || "",
      branch: formData.branch || "",
      course: formData.course || "",
      yearOfStudy: formData.yearOfStudy || "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateFormData(values)
    nextStep()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-center mb-6">
          <GraduationCap className="w-12 h-12 text-primary" />
        </div>

        <div className="bg-blue-900 p-4 rounded-lg mb-6">
          <p className="text-sm text-white">
            <strong>Important:</strong> To ensure fair competition, this tournament is open only to current university
            students. You will be required to provide proof of your student status.
          </p>
        </div>

        <FormField
          control={form.control}
          name="university"
          render={({ field }) => (
            <FormItem>
              <FormLabel>University Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your university name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch (if applicable)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter N/A if not applicable" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year of Study</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year of study" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year === 5
                        ? "5th Year+"
                        : `${year}${year === 1 ? "st" : year === 2 ? "nd" : year === 3 ? "rd" : "th"} Year`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="studentProof"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Proof Upload (School ID or letter of admission)</FormLabel>
              <FormControl>
                <FileUpload
                  field={field}
                  fieldName="studentProof"
                  accept={{ "application/pdf": [".pdf"], "image/*": [".jpeg", ".jpg", ".png"] }}
                  maxSize={MAX_FILE_SIZE}
                  updateFormData={updateFormData}
                  preview={undefined}
                />
              </FormControl>
              <FormDescription>
                Upload your school ID or letter of admission (PDF/JPG/PNG, max 10MB). This is required to verify your
                student status and ensure only university students are participating in the tournament.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" onClick={prevStep} variant="outline">
            Previous
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  )
}

