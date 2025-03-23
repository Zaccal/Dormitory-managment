import NotificaitonSectionHeader from "./NotificaitonSectionHeader"
import NotificationSectionItem from "./NotificationSectionItem"

const NoticationSection = () => {
  return (
    <div className="border dark:border-0 dark:bg-primary rounded-lg col-auto xl:col-span-2 xl2:col-auto">
      <NotificaitonSectionHeader />
      <NotificationSectionItem type="Important" />
      <NotificationSectionItem type="Warning" />
      <NotificationSectionItem type="info" />
    </div>
  )
}

export default NoticationSection
