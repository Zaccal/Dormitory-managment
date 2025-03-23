import ThemeOption from "@/components/shared/ThemeOption"
import { useTheme } from "@/hooks/theme-provider"

const General = () => {
  const { setTheme } = useTheme()

  return (
    <div className="mt-8">
      <h1 className="font-semibold text-xl mb-5">Настройка темы оформления</h1>
      <div className="w-full flex flex-col gap-5">
        <ThemeOption onClick={theme => setTheme(theme)} theme={"system"} />
        <ThemeOption onClick={theme => setTheme(theme)} theme={"dark"} />
        <ThemeOption onClick={theme => setTheme(theme)} theme={"light"} />
      </div>
    </div>
  )
}

export default General
