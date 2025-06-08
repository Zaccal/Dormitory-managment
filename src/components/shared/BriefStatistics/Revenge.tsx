import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import useAmountOfMoneyForThisMonth from '@/hooks/statistics/useAmountOfMoneyForThisMonth'
import { formatNumber } from '@/lib/formatPrice'

const Revenge = () => {
    const { data, error, isError, isLoading } = useAmountOfMoneyForThisMonth()

    return (
        <>
            {!isLoading && !isError ? (
                <div className="flex min-w-[300px] flex-col gap-2">
                    <h3 className="font-semibold text-2xl">
                        Соброно в этом месяце
                    </h3>
                    <div className="flex items-ed gap-4">
                        <span className="font-bold text-2xl">
                            ₸{formatNumber(data?.totalAmount || 0)}
                        </span>
                        <div className="flex items-center gap-2">
                            <Badge className="dark:bg-secondary">
                                {data?.procentage.split('.')[0]}
                                <span className="opacity-75">
                                    .{data?.procentage.split('.')[1]}
                                </span>
                                %
                            </Badge>
                        </div>
                    </div>
                    <p>Необходимая цель: ₸{formatNumber(data?.goal || 0)}</p>
                </div>
            ) : (
                <Skeleton className="min-w-[300px] h-[138px]" />
            )}

            {isError && (
                <p className="text-destructive">Ошипка: {error.message}</p>
            )}
        </>
    )
}

export default Revenge
