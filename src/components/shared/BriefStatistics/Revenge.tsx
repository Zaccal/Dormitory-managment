import { Badge } from '@/components/ui/badge'
import useAmountOfMoneyForThisMonth from '@/hooks/useAmountOfMoneyForThisMonth'
import { formatNumber } from '@/utils/FormatePrice'

const Revenge = () => {
    const { data, error, isError, isLoading } = useAmountOfMoneyForThisMonth()

    return (
        <>
            {!isError && !isLoading ? (
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
                <p className="text-destructive font-bold">
                    Error: {error?.message}
                </p>
            )}
        </>
    )
}

export default Revenge
