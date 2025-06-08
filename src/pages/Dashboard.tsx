import ApplicationsTable from '@/components/shared/ApplicationsTable'
import BriefStatistics from '@/components/shared/BriefStatistics/BriefStatistics'
import DateToday from '@/components/shared/DateToday'
import NoticationSection from '@/components/shared/NotificationSection/NoticationSection'
import RecentPayTable from '@/components/shared/RecentPayTable/RecentPayTable'

const Dashboard = () => {
    return (
        <div className="py-11">
            <BriefStatistics />
            <div className="container">
                <div className="mt-16 grid grid-cols-1 xl:grid-cols-2 xl2:grid-cols-3 gap-5">
                    <DateToday />
                    <RecentPayTable />
                    <NoticationSection />
                </div>
            </div>
            <ApplicationsTable className="mt-12" />
        </div>
    )
}

export default Dashboard
