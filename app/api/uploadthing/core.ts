import { createUploadthing, type FileRouter } from "uploadthing/next"
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/lib/auth"

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      return { imageUrl: file.url }
    }),

  pdfUploader: f({ pdf: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      return { pdfUrl: file.url }
    }),

  blobUploader: f({ blob: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      return { blobUrl: file.url }
    })

} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

