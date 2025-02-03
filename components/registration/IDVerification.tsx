import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { FileUpload } from "@/components/FileUpload"
import { ReviewSubmitProps } from "./UniversityVerification"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const formSchema = z.object({
  nationalId: z
    .any()
    .refine((file) => file instanceof File || file instanceof Blob, "National ID is required")
    .refine(
      (file) => (file instanceof File || file instanceof Blob) && file.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    ),
})

export default function IDVerification({ formData, updateFormData, prevStep,nextStep}: ReviewSubmitProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nationalId: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const file = values.nationalId instanceof File 
      ? values.nationalId 
      : new File([values.nationalId], "upload", { type: (values.nationalId as Blob).type });
    updateFormData({ nationalId: file });
    nextStep();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-12 h-12 text-primary" />
        </div>

        <FormField
          control={form.control}
          name="nationalId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>National ID Upload</FormLabel>
              <FormControl>
                <FileUpload
                  field={field}
                  fieldName="nationalId"
                  accept={{ "image/*": [".jpeg", ".jpg", ".png"], "application/pdf": [".pdf"] }}
                  maxSize={MAX_FILE_SIZE}
                  updateFormData={updateFormData}
                  preview={formData.nationalIdPreview}
                />
              </FormControl>
              <FormDescription>Upload front and back in one file (JPG/PNG/PDF, max 5MB)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="bg-blue-900 p-4 rounded-lg">
          <p className="font-bold">Privacy Assurance</p>
          <p className="text-sm">
            Your documents will be securely stored and deleted after verification (GDPR compliant)
          </p>
        </div>

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

