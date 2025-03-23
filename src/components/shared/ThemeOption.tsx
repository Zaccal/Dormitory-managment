import { Theme, useTheme } from "@/hooks/theme-provider"
import { cn } from "@/lib/utils"
import { getIcon, getIconStyles, getThemeArticles } from "@/utils/getStylesForThemeOptionUI"
import { MouseEvent } from "react"

interface IThemeOption {
  theme: Theme
  onClick?: (theme: Theme, event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void
}

const ThemeOption = ({ theme, onClick }: IThemeOption) => {
  const currentTheme: Theme = useTheme().theme
  const isActive =
    currentTheme === theme
      ? "border-2 border-primary dark:border-secondary"
      : "border border-muted-foreground/25"

  return (
    <div
      onClick={event => {
        if (onClick) onClick(theme, event)
      }}
      className={cn("w-full px-4 py-2 cursor-pointer rounded-md flex items-center gap-5", isActive)}
    >
      <div className={cn("rounded-md px-12 py-8", getIconStyles(theme))}>{getIcon(theme)}</div>
      <div className="">
        <h3 className="text-lg font-semibold">{getThemeArticles(theme).title}</h3>
        <p className="text-md text-muted-foreground">{getThemeArticles(theme).description}</p>
      </div>
    </div>
  )
}

export default ThemeOption
