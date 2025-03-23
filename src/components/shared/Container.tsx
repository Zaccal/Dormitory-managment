import { cn } from "@/lib/utils"
import { FC, ReactElement } from "react"

interface IContainer {
  children?: ReactElement | ReactElement[]
  className?: string
}

const Container: FC<IContainer> = ({ children, className }) => {
  return <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", className)}>{children}</div>
}

export default Container
