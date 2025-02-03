import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center space-y-6 p-6">
          <Skeleton className="h-8 w-3/4" /> {/* Title skeleton */}
          <Skeleton className="h-4 w-full" /> {/* Message line 1 skeleton */}
          <Skeleton className="h-4 w-5/6" /> {/* Message line 2 skeleton */}
          <Skeleton className="h-10 w-32" /> {/* Button skeleton */}
        </CardContent>
      </Card>
    </div>
  )
}

