import { createUploadthing, type FileRouter } from "uploadthing/next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

const f = createUploadthing()

const auth = async () => {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) throw new Error("Unauthorized")
  return { userId: (session.user as { id: string }).id }
}

export const ourFileRouter = {
  imageUploader: f({
    image:
      { maxFileSize: "4MB", maxFileCount: 1 }
  }
  )
    .middleware(async () => {
      const user = await auth()
      return { userId: user.userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Image upload completed for userId:", metadata.userId)
      console.log("file url", file.url)

      return { imageUrl: file.url, userId: metadata.userId }
    }),

  pdfUploader: f({ pdf: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const user = await auth()
      return { userId: user.userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("PDF upload completed for userId:", metadata.userId)
      console.log("file url", file.url)

      return { pdfUrl: file.url, userId: metadata.userId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

