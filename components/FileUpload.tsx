import { useState, useCallback, useRef, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Upload, Camera, FileText } from "lucide-react"
import type { ControllerRenderProps, FieldValues } from "react-hook-form"

interface FileUploadProps<T extends FieldValues> {
  field: ControllerRenderProps<T>
  fieldName: string
  accept: Record<string, string[]>
  maxSize: number
  updateFormData: (data: Record<string, unknown>) => void
  preview: string | undefined
}

export const FileUpload = <T extends FieldValues>({
  field,
  fieldName,
  accept,
  maxSize,
  updateFormData,
  preview,
}: FileUploadProps<T>) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(preview || null)
  const [fileType, setFileType] = useState<"image" | "pdf" | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showCamera, setShowCamera] = useState(false)

  useEffect(() => {
    if (preview) {
      setPreviewUrl(preview)
      setFileType("image")
    }
  }, [preview])

  const handleFile = useCallback(
    (file: File | Blob) => {
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const result = reader.result as string
          setPreviewUrl(result)
          setFileType(file.type.startsWith("image/") ? "image" : "pdf")

          // Create a new File object from Blob if necessary
          const fileObject =
            file instanceof Blob && !(file instanceof File)
              ? new File([file], `${fieldName}_capture.jpg`, { type: "image/jpeg" })
              : file

          updateFormData({
            [fieldName]: fileObject,
            [`${fieldName}Name`]: fileObject instanceof File ? fileObject.name : `${fieldName}_capture.jpg`,
            [`${fieldName}Preview`]: result,
          })
        }
        reader.readAsDataURL(file)

        field.onChange(file)
      }
    },
    [field, fieldName, updateFormData],
  )

  const onDropCallback = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept,
    maxSize,
    multiple: false,
  })

  const startCamera = async () => {
    setShowCamera(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            handleFile(blob)
          }
        }, "image/jpeg")
      }
    }
    stopCamera()
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
    }
    setShowCamera(false)
  }

  return (
    <div className="space-y-4">
      {showCamera ? (
        <div className="space-y-4">
          <video ref={videoRef} autoPlay className="w-full h-auto" />
          <canvas ref={canvasRef} style={{ display: "none" }} width="640" height="480" />
          <div className="flex justify-between">
            <Button type="button" onClick={capturePhoto}>
              <Camera className="w-4 h-4 mr-2" />
              Capture Photo
            </Button>
            <Button type="button" onClick={stopCamera} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
              isDragActive ? "border-primary" : "border-muted-foreground"
            }`}
          >
            <input {...getInputProps()} />
            {previewUrl ? (
              fileType === "image" ? (
                <div className="relative w-full h-40">
                  <Image src={previewUrl || "/placeholder.svg"} alt="File preview" layout="fill" objectFit="contain" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40">
                  <FileText className="w-12 h-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">PDF file uploaded</p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-40">
                <Upload className="w-12 h-12 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Drag and drop your file here, or click to select a file</p>
              </div>
            )}
            {field.value && (
              <p className="mt-2 text-sm text-muted-foreground">
                Selected file: {field.value.name} ({(field.value.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
          <div className="flex justify-start">
            <Button type="button" onClick={startCamera}>
              <Camera className="w-4 h-4 mr-2" />
              Use Camera
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

