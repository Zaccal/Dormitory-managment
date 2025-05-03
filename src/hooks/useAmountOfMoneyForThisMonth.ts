import supabase from '@/utils/supabase'
import { useQuery } from '@tanstack/react-query'

function useAmountOfMoneyForThisMonth() {
    const now = new Date()
    const firstDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        1,
    ).toISOString()
    const lastDay = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
    ).toISOString()

    return useQuery({
        queryKey: ['amountOfMoneyForThisMonth'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('payments')
                .select(
                    '*, profile:student_profile_id ( id, first_name, last_name, phone )',
                )
                .gte('created_at', firstDay)
                .lte('created_at', lastDay)
            const { data: profiles, error: profilesError } = await supabase
                .from('profiles')
                .select('*')

            if (error) throw error
            if (profilesError) throw profilesError

            let goal = 0
            for (let i = 0; i <= profiles?.length; i++) {
                goal += 10000
            }

            const totalAmount = data?.reduce((acc, item) => {
                return acc + parseInt(item.amount)
            }, 0)

            const procentage = ((totalAmount / goal) * 100).toFixed(2)

            return {
                goal,
                totalAmount,
                procentage,
            }
        },
    })
}

export default useAmountOfMoneyForThisMonth
