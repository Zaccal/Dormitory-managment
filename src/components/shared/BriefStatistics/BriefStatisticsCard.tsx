import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ReactElement } from "react"

interface IBriefStatisticsCard {
  className?: string
  title: string
  content: string
  subtitle: string
  icon: ReactElement
}

const BriefStatisticsCard = ({
  content,
  subtitle,
  title,
  className,
  icon,
}: IBriefStatisticsCard) => {
  return (
    <Card className={cn("dark:bg-primary dark:border-0", className)}>
      <CardHeader className="py-3">
        <h3 className="font-semibold flex items-center justify-between">
          {title}
          {icon}
        </h3>
      </CardHeader>
      <CardContent className="pb-3">
        <span className="font-bold text-2xl">{content}</span>
      </CardContent>
      <CardFooter>
        <CardDescription>{subtitle}</CardDescription>
      </CardFooter>
    </Card>
  )
}

export default BriefStatisticsCard
