import RecentPaidUser from "./RecentPaidUser"

// TODO: Connect to database (create realtime data)

const RecentPayTable = () => {
  return (
    <div className="border dark:border-0 dark:bg-primary rounded-md space-y-1.5 p-6">
      <div className="mb-8">
        <h2 className="text-lg font-semibold">Последние платежи</h2>
        <p className="text-muted-foreground">120 студентов оплатили за этот месяц</p>
      </div>
      <div className="flex flex-col gap-8">
        <RecentPaidUser
          firstName="Адиль"
          lastName="Жалтырбаев"
          date="2024-11-11 09:15:30.816883+00"
          amount={10000}
          email="ksss90411@gmail.com"
        />
        <RecentPaidUser
          firstName="Адиль"
          lastName="Жалтырбаев"
          date="2024-11-11 09:15:30.816883+00"
          amount={10000}
          email="ksss90411@gmail.com"
        />
        <RecentPaidUser
          firstName="Адиль"
          lastName="Жалтырбаев"
          date="2024-11-11 09:15:30.816883+00"
          amount={10000}
          email="ksss90411@gmail.com"
        />
        <RecentPaidUser
          firstName="Адиль"
          lastName="Жалтырбаев"
          date="2024-11-11 09:15:30.816883+00"
          amount={10000}
          email="ksss90411@gmail.com"
        />
      </div>
    </div>
  )
}

export default RecentPayTable
