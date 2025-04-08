import CreateNotification from "@/components/shared/CreateNotification";
import Loader from "@/components/shared/Loader";
import NotificationCard from "@/components/shared/NotificationCard";
import useGetNotification from "@/hooks/useGetNotifications";
import useProfile from "@/hooks/useProfile";
import Error from "@/pages/Error";

const Notifications = () => {
  const { data, isLoading, isError, error } = useProfile();
  const {
    data: notifications,
    isLoading: isLoadingNotifications,
    isError: isErrorNotifications,
  } = useGetNotification();

  if (isError) return <Error title={error.message} />;

  return (
    <div className="container mt-12">
      <h1 className="font-bold mb-5 text-2xl">Уведомления</h1>
      {(!isLoading && data?.role === "administrator") ||
        data?.role === "main_superintendent" ? (
        <CreateNotification />
      ) : undefined}

      <div className="flex flex-col gap-6">
        {isLoadingNotifications ? (
          <div className="flex justify-center">
            <div className="flex items-center gap-6 flex-col">
              <Loader />
              <p>Загрузка...</p>
            </div>
          </div>
        ) : isErrorNotifications ? (
          <p className="text-center text-destructive">
            Ошипка попробуите снова
          </p>
        ) : (
          notifications?.map((dataNotification) => (
            <>
              <NotificationCard
                key={dataNotification.id}
                id={dataNotification.id}
                type={dataNotification.type}
                description={dataNotification.message}
                createdAt={dataNotification.created_at}
                role={data?.role}
              />
            </>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
