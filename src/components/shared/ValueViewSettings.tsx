import SkeletonText from "./SkeletonText"

interface IValueViewSettings {
  label: string
  value?: string | null
  isError: boolean
}

const ValueViewSettings = ({ label, value, isError }: IValueViewSettings) => {
  return (
    <div className="text-2xl flex items-center gap-2">
      <span className="text-muted-foreground underline dark:text-muted">{label}:</span>
      <span className="font-semibold">
        {value ? value : <SkeletonText className="w-[113px] h-[31px]" />}
        {isError && "Ошипка, не смогли загрузит"}
      </span>
    </div>
  )
}

export default ValueViewSettings
