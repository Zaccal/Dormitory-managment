import useGetRecentNotification from '@/hooks/useGetRecentNotification'
import NotificaitonSectionHeader from './NotificaitonSectionHeader'
import NotificationSectionItem from './NotificationSectionItem'
import Loader from '../Loader'

const NoticationSection = () => {
    const { data, isLoading, isError, error } = useGetRecentNotification()

    return (
        <div className="border dark:border-0 dark:bg-primary rounded-lg col-auto xl:col-span-2 xl2:col-auto">
            <NotificaitonSectionHeader />
            {isError && !data?.length ? (
                <p>Оишика: {error.message || 'Упс что-то не так пошло'}</p>
            ) : undefined}
            {data || !isLoading ? (
                data?.map((notificationData) => (
                    <NotificationSectionItem
                        description={notificationData.message}
                        type={notificationData.type}
                    />
                ))
            ) : (
                <div className="flex justify-center items-center h-[70%] w-full">
                    <Loader />
                </div>
            )}
        </div>
    )
}

export default NoticationSection
