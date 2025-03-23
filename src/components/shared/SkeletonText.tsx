import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"

interface ISkeletonText {
  className?: string
}

const SkeletonText = ({ className }: ISkeletonText) => {
  return (
    <>
      <Skeleton
        className={cn(
          "items-center justify-center bg-sidebar-accent-foreground text-sidebar-accent rounded-lg",
          className
        )}
      />
    </>
  )
}

export default SkeletonText
