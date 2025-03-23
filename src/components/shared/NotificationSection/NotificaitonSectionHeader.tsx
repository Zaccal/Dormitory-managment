const NotificaitonSectionHeader = () => {
  return (
    <>
      <div className="border-b dark:border-0 px-8 py-4 gap-16 flex items-center justify-between">
        <span className="font-semibold text-lg">Уведомления</span>
      </div>
      <div className="bg-destructive-foreground mb-2 px-8 py-3 border-b dark:border-0">
        <span className="font-semibold text-muted-foreground">Сегодня</span>
      </div>
    </>
  )
}

export default NotificaitonSectionHeader
