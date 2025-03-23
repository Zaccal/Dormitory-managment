import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatNumber } from "@/utils/FormatePrice"
import dayjs from "dayjs"

interface IRecentPaidUser {
  avatar?: string
  firstName: string
  lastName: string
  email: string
  amount: number
  date: string
}

const RecentPaidUser = ({ avatar, email, firstName, lastName, amount, date }: IRecentPaidUser) => {
  return (
    <div className="flex flex-col gap-2 sm2:gap-0 sm2:flex-row items-center justify-between">
      <div className="flex gap-4 items-center">
        <Avatar className="hidden sm2:block">
          <AvatarImage src={avatar} />
          <AvatarFallback>
            {firstName[0].toLocaleUpperCase() + lastName[0].toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <span className="text-sm">
            {firstName} {lastName}
          </span>
          <span className="text-muted-foreground text-sm">{email}</span>
        </div>
      </div>
      <div className="flex gap-2 sm2:gap-4 items-center">
        <span className="font-bold text-sm sm2:text-md">+₸{formatNumber(amount)}</span>
        <span className="text-muted-foreground dark:text-muted">|</span>
        <span className="text-muted-foreground dark:text-muted text-sm sm2:text-md">
          {dayjs(date).format("DD.MM.YYYY")}
        </span>
      </div>
    </div>
  )
}

export default RecentPaidUser
