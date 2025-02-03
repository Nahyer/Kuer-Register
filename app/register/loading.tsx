import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-2xl mx-auto">
        <Skeleton className="w-24 h-10 mb-6" /> {/* Back button skeleton */}
        <Skeleton className="w-3/4 h-12 mx-auto mb-6" /> {/* Title skeleton */}
        <Skeleton className="w-full h-8 mb-6" /> {/* Progress bar skeleton */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-3/4 h-12" />
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-1/2 h-12" />
              <Skeleton className="w-full h-32" />
              <div className="flex justify-between">
                <Skeleton className="w-1/4 h-10" />
                <Skeleton className="w-1/4 h-10" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

