import { Theme } from "@/hooks/theme-provider"
import { Computer, Moon, Sun } from "lucide-react"

export const getIcon = (theme: Theme) => {
  switch (theme) {
    case "dark":
      return <Moon />
    case "light":
      return <Sun size={28} />
    default:
      return <Computer />
  }
}

export const getIconStyles = (theme: Theme) => {
  switch (theme) {
    case "dark":
      return "bg-blue-950 text-white"
    case "light":
      return "bg-yellow-400 text-white"
    default:
      return "bg-blue-400 text-white"
  }
}

export const getThemeArticles = (theme: Theme) => {
  switch (theme) {
    case "dark":
      return {
        title: "Тёмная",
        description: "комфортная для глаз в условиях низкой освещённости",
      }
    case "light":
      return {
        title: "Светлая",
        description: "классический вариант для дневного использования",
      }
    default:
      return {
        title: "Системная",
        description: "автоматически адаптируется к настройкам вашей системы",
      }
  }
}
