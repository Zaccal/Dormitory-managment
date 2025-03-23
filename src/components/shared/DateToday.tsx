import useProfile from "@/hooks/useProfile"
import dayjs from "dayjs"
import "dayjs/locale/ru"
import { Calendar } from "../ui/calendar"

dayjs.locale("ru")

const DateToday = () => {
  const { data: dataProfile, isLoading, isError } = useProfile()
  const dataday = dayjs().format("DD MMMM YYYY, dddd")

  if (isLoading && isError) return undefined

  return (
    <div className="rounded-lg border dark:border-0 dark:bg-primary px-6 py-8">
      <h1 className="font-bold text-2xl">Добро пожаловать, {dataProfile?.first_name}!</h1>
      <p className="text-muted-foreground text-lg mt-2">{dataday}</p>
      <div className="h-max">
        <Calendar
          className="h-full w-full flex mt-2"
          classNames={{
            months: "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
            month: "space-y-2 w-full flex flex-col",
            table: "w-full h-full border-collapse space-y-1",
            head_row: "",
            row: "w-full mt-2",
          }}
        />
      </div>
    </div>
  )
}

export default DateToday
