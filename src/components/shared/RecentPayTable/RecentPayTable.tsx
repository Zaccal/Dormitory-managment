import useGetRecentPaymentStudents from "@/hooks/useGetRecentPaymentStudents";
import RecentPaidUser from "./RecentPaidUser";
import { Skeleton } from "@/components/ui/skeleton";
import useGetCountStudentPaymentMonth from "@/hooks/useGetCountStudentPaymentMonth";

// TODO: Connect to database (create realtime data)

const RecentPayTable = () => {
  const { data, isLoading, isError, error } = useGetRecentPaymentStudents();
  const {
    data: count,
    isError: isCountError,
    isLoading: isCountLoading,
  } = useGetCountStudentPaymentMonth();

  return (
    <div className="border dark:border-0 dark:bg-primary rounded-md space-y-1.5 p-6">
      <div className="mb-8">
        <h2 className="text-lg font-semibold">Последние платежи</h2>
        <p className="text-muted-foreground">
          {!isCountLoading
            ? !isCountError
              ? `${count} студентов оплатили за этот месяц`
              : `Ошипка: Не смогли загрузит количство оплат`
            : undefined}{" "}
        </p>
      </div>
      <div className="flex flex-col gap-6">
        {isLoading &&
          [...Array(5)].map(() => (
            <Skeleton className="w-full h-11 rounded-lg" />
          ))}

        {isError && (
          <div className="w-full h-11 bg-destructive rounded-lg text-white flex items-center px-4">
            Ошипка: {error ? error.message : "Упс... что-то пошло не так"}
          </div>
        )}

        {data &&
          data.map((data) => (
            <RecentPaidUser
              firstName={data.profiles?.first_name || ""}
              lastName={data.profiles?.last_name || ""}
              date={data.created_at}
              amount={Number(data.amount)}
              email={data.profiles?.email || ""}
              avatar={data.profiles?.photo_face || ""}
            />
          ))}
      </div>
    </div>
  );
};

export default RecentPayTable;
