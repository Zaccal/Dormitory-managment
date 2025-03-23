import { getIcon, getTitle, TypeNotification } from "@/utils/getSignNotification"
import { truncateTextByWords } from "@/utils/TruncateText"

interface INotificationSectionItem {
  type: TypeNotification
}

const NotificationSectionItem = ({ type }: INotificationSectionItem) => {
  return (
    <div className="px-4 py-4 xl2:py-2.5 flex items-start gap-7">
      {getIcon(type)}
      <div className="">
        <h5 className="font-bold relative before:bg-green-500 before:content-[''] before:absolute before:-left-2.5 before:top-[40%] before:w-1.5 before:h-1.5 before:rounded-full">
          {getTitle(type)}
        </h5>
        <p className="text-muted-foreground dark:text-muted text-sm sm2:text-md">
          {truncateTextByWords(
            `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, aliquid nihil
          exercitationem numquam at similique quod earum recusandae quis est repellat deserunt amet?
          Nulla cumque consequuntur accusantium adipisci vel tempore.`,
            23
          )}
        </p>
      </div>
    </div>
  )
}

export default NotificationSectionItem
