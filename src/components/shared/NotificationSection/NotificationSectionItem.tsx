import {
    getIcon,
    getTitle,
    TypeNotification,
} from '@/lib/notificationStaticData'
import { truncateTextByWords } from '@/lib/truncateText'

interface INotificationSectionItem {
    type: TypeNotification
    description: string
}

const NotificationSectionItem = ({
    type,
    description,
}: INotificationSectionItem) => {
    return (
        <div className="px-4 py-4 xl2:py-2.5 flex items-start gap-7">
            {getIcon(type)}
            <div className="">
                <h5 className="font-bold relative before:bg-green-500 before:content-[''] before:absolute before:-left-2.5 before:top-[40%] before:w-1.5 before:h-1.5 before:rounded-full">
                    {getTitle(type)}
                </h5>
                <p className="text-muted-foreground dark:text-muted text-sm sm2:text-md">
                    {truncateTextByWords(description, 23)}
                </p>
            </div>
        </div>
    )
}

export default NotificationSectionItem
