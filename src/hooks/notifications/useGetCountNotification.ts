import supabase from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

function useGetCountNotification() {
    return useQuery({
        queryKey: ['countNotification'],
        queryFn: async () => {
            const { count, error } = await supabase
                .from('notifications')
                .select('*', { count: 'exact', head: true })

            if (error) throw error

            return count
        },
    })
}

export default useGetCountNotification
