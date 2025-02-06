import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  steps: string[]
  currentStep: number
  isSubmitting?: boolean
  uploadProgress?: number
}

export default function ProgressBar({
  steps,
  currentStep,
  isSubmitting = false,
  uploadProgress = 0,
}: ProgressBarProps) {
  const isSmallScreen = useMediaQuery("(max-width: 640px)")

  return (
    <div className={`mb-8 ${isSmallScreen ? "flex" : ""}`}>
      <div className={`${isSmallScreen ? "flex-col space-y-4" : "flex justify-between"}`}>
        {steps.map((step, index) => (
          <div key={index} className={`flex ${isSmallScreen ? "flex-row items-center" : "flex-col items-center"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index + 1 <= currentStep ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>
            <span className={`text-xs ${isSmallScreen ? "ml-2" : "mt-2"}`}>{step}</span>
          </div>
        ))}
      </div>
      <div className={`${isSmallScreen ? "w-2 ml-4" : "mt-4 h-2"} bg-gray-300 rounded-full`}>
        <div
          className={`${isSmallScreen ? "h-full w-2" : "h-full"} bg-blue-500 rounded-full transition-all duration-300 ease-in-out`}
          style={
            isSmallScreen
              ? { height: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }
              : { width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }
          }
        ></div>
      </div>
      {isSubmitting && (
        <div className="mt-4 space-y-2">
          <Progress value={uploadProgress} className="w-full" />
          <p className="text-center text-sm text-muted-foreground">Uploading: {Math.round(uploadProgress)}%</p>
        </div>
      )}
    </div>
  )
}

